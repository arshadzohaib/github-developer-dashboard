import { githubFetch, githubFetchAll, GitHubError } from './githubApi'

export { GitHubError }

const encode = encodeURIComponent

export async function getUser(username) {
  return githubFetch(`/users/${encode(username)}`)
}

export async function searchUsers(query, { perPage = 10 } = {}) {
  return githubFetch('/search/users', { params: { q: query, per_page: perPage } })
}

export async function getUserRepositories(
  username,
  { sort = 'updated', type = 'owner', perPage = 100, maxPages = 3 } = {},
) {
  return githubFetchAll(`/users/${encode(username)}/repos`, {
    params: { sort, type, per_page: perPage },
    perPage,
    maxPages,
  })
}

export async function getRepository(owner, repo) {
  return githubFetch(`/repos/${encode(owner)}/${encode(repo)}`)
}

export async function getRepositoryLanguages(owner, repo) {
  return githubFetch(`/repos/${encode(owner)}/${encode(repo)}/languages`)
}

export async function getRepositoryCommits(owner, repo, { perPage = 100, maxPages = 1 } = {}) {
  return githubFetchAll(`/repos/${encode(owner)}/${encode(repo)}/commits`, {
    params: { per_page: perPage },
    perPage,
    maxPages,
  })
}

export async function getRepositoryContributors(owner, repo, { perPage = 100, maxPages = 2 } = {}) {
  return githubFetchAll(`/repos/${encode(owner)}/${encode(repo)}/contributors`, {
    params: { per_page: perPage, anon: false },
    perPage,
    maxPages,
  })
}

export async function getUserEvents(username, { perPage = 100, maxPages = 3 } = {}) {
  return githubFetchAll(`/users/${encode(username)}/events`, {
    params: { per_page: perPage },
    perPage,
    maxPages,
  })
}

export async function getUserReceivedEvents(username, { perPage = 100, maxPages = 1 } = {}) {
  return githubFetchAll(`/users/${encode(username)}/received_events`, {
    params: { per_page: perPage },
    perPage,
    maxPages,
  })
}

export async function getRepositoryStatsCommitActivity(owner, repo) {
  return githubFetch(`/repos/${encode(owner)}/${encode(repo)}/stats/commit_activity`, {
    ignoreStatuses: [202, 204],
  })
}

export async function getRepositoryStatsContributors(owner, repo) {
  return githubFetch(`/repos/${encode(owner)}/${encode(repo)}/stats/contributors`, {
    ignoreStatuses: [202, 204],
  })
}

export async function getRateLimit() {
  return githubFetch('/rate_limit')
}

export function isRateLimitError(error) {
  return error instanceof GitHubError && error.rateLimited
}

export function isNotFoundError(error) {
  return error instanceof GitHubError && error.notFound
}
