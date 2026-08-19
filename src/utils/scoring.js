import { computeEventActivity } from './analytics.js'

const log10 = (n) => Math.log10(n + 1)
const cap = (value, max) => Math.min(Math.max(value, 0), max)
const SIX_MONTHS_MS = 182 * 24 * 60 * 60 * 1000

const STARS_SCALE = log10(5000)
const FORKS_SCALE = log10(1000)
const FOLLOWERS_SCALE = log10(10000)

export function calculateDevPulseScore({ user = {}, repos = [], events = [] }) {
  const totalRepos = repos.length
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
  const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0)
  const followers = user.followers || 0

  const now = Date.now()
  const recentlyPushed = repos.filter(
    (r) => new Date(r.pushed_at || r.updated_at).getTime() > now - SIX_MONTHS_MS,
  )
  const activeFraction = totalRepos ? recentlyPushed.length / totalRepos : 0
  const licensedFraction = totalRepos ? repos.filter((r) => r.license).length / totalRepos : 0

  const eventActivity = computeEventActivity(events)
  const consistency = eventActivity.consistency

  const factors = [
    {
      key: 'stars',
      label: 'Stars & impact',
      max: 25,
      points: cap((log10(totalStars) / STARS_SCALE) * 25, 25),
      description: `Earned from ${totalStars} total stars across repositories (log-scaled, capped).`,
    },
    {
      key: 'forks',
      label: 'Forks & reuse',
      max: 15,
      points: cap((log10(totalForks) / FORKS_SCALE) * 15, 15),
      description: `Earned from ${totalForks} total forks — a signal of reuse and collaboration.`,
    },
    {
      key: 'activity',
      label: 'Repository activity',
      max: 20,
      points: cap(activeFraction * 20, 20),
      description: `${recentlyPushed.length} of ${totalRepos} repositories were pushed to in the last 6 months.`,
    },
    {
      key: 'consistency',
      label: 'Contribution consistency',
      max: 15,
      points: cap((consistency / 100) * 15, 15),
      description: `Public-event activity spanned ${eventActivity.activeDays} of ${eventActivity.spanDays} available days (${consistency}%).`,
    },
    {
      key: 'maintenance',
      label: 'Repository maintenance',
      max: 15,
      points: cap(activeFraction * 10 + licensedFraction * 5, 15),
      description: `Combines recent activity (${Math.round(activeFraction * 100)}%) with licensed repositories (${Math.round(
        licensedFraction * 100,
      )}%).`,
    },
    {
      key: 'engagement',
      label: 'Community engagement',
      max: 10,
      points: cap((log10(followers) / FOLLOWERS_SCALE) * 10, 10),
      description: `Earned from ${followers} followers (log-scaled, capped).`,
    },
  ]

  const score = Math.round(factors.reduce((sum, f) => sum + f.points, 0))
  const band = getScoreBand(score)

  return {
    score,
    max: 100,
    band,
    factors,
    explanation:
      'DevPulse is a 0–100 score summarizing a developer’s real GitHub footprint. It weights stars and forks (impact), recent repository activity and maintenance, public-event consistency, and community engagement. All inputs are sourced from the GitHub REST API — the score is deterministic, never random.',
  }
}

export function getScoreBand(score) {
  if (score >= 80) return { label: 'Excellent', color: 'green' }
  if (score >= 60) return { label: 'Good', color: 'brand' }
  if (score >= 40) return { label: 'Fair', color: 'amber' }
  return { label: 'Needs Attention', color: 'red' }
}
