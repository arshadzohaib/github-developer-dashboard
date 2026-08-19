// Analytics helpers that turn raw GitHub API payloads into dashboard-ready data.
// Only real metrics returned by the GitHub API are used — nothing is fabricated.

export function computeRepositoryStats(repos) {
  const totals = repos.reduce(
    (acc, repo) => {
      acc.stars += repo.stargazers_count || 0
      acc.forks += repo.forks_count || 0
      acc.watchers += repo.watchers_count || 0
      acc.openIssues += repo.open_issues_count || 0
      return acc
    },
    { stars: 0, forks: 0, watchers: 0, openIssues: 0 },
  )

  const source = repos.filter((repo) => !repo.fork).length
  const fork = repos.length - source

  return {
    total: repos.length,
    totalStars: totals.stars,
    totalForks: totals.forks,
    totalWatchers: totals.watchers,
    openIssues: totals.openIssues,
    byType: { source, fork },
  }
}

export function computeLanguageDistribution(repos) {
  const repoCounts = {}
  let total = 0

  repos
    .filter((repo) => !repo.fork && repo.language)
    .forEach((repo) => {
      const lang = repo.language
      repoCounts[lang] = (repoCounts[lang] || 0) + 1
      total += 1
    })

  return Object.entries(repoCounts)
    .map(([language, count]) => ({
      language,
      count,
      percentage: total ? (count / total) * 100 : 0,
    }))
    .sort((a, b) => b.count - a.count)
}

const DAY_MS = 24 * 60 * 60 * 1000

export function computeRepoLanguages(languages = {}) {
  const entries = Object.entries(languages)
  const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0)
  if (!total) return []
  return entries
    .map(([language, bytes]) => ({
      language,
      bytes,
      percentage: (bytes / total) * 100,
    }))
    .sort((a, b) => b.bytes - a.bytes)
}

export function computeEventActivity(events) {
  if (!events?.length) {
    return { perDay: [], byType: [], total: 0, activeDays: 0, spanDays: 0, consistency: 0, recent: [] }
  }

  const byDay = {}
  const byType = {}
  events.forEach((event) => {
    const day = event.created_at.slice(0, 10)
    byDay[day] = (byDay[day] || 0) + 1
    byType[event.type] = (byType[event.type] || 0) + 1
  })

  const perDay = Object.entries(byDay)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date))
  const byTypeArr = Object.entries(byType)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)

  const timestamps = perDay.map((d) => new Date(d.date).getTime())
  const spanDays = timestamps.length
    ? Math.max(1, Math.round((Math.max(...timestamps) - Math.min(...timestamps)) / DAY_MS) + 1)
    : 0
  const activeDays = perDay.length
  const consistency = spanDays ? Math.round((activeDays / spanDays) * 100) : 0

  const recent = [...events]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 8)

  return { perDay, byType: byTypeArr, total: events.length, activeDays, spanDays, consistency, recent }
}

export function sortRepositories(repos, key = 'stars', dir = 'desc') {
  const modifiers = {
    stars: (r) => r.stargazers_count || 0,
    forks: (r) => r.forks_count || 0,
    updated: (r) => new Date(r.pushed_at || r.updated_at).getTime(),
    name: (r) => r.name.toLowerCase(),
  }
  const getValue = modifiers[key] || modifiers.stars
  const sorted = [...repos].sort((a, b) => getValue(a) - getValue(b))
  return dir === 'desc' ? sorted.reverse() : sorted
}
