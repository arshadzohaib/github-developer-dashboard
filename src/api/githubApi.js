const API_BASE = import.meta.env.VITE_GITHUB_API_URL || 'https://api.github.com'
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN

export class GitHubError extends Error {
  constructor(message, { status, rateLimited = false, notFound = false } = {}) {
    super(message)
    this.name = 'GitHubError'
    this.status = status
    this.rateLimited = rateLimited
    this.notFound = notFound
  }
}

function buildHeaders() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`
  return headers
}

function isRateLimited(response) {
  const remaining = response.headers.get('x-ratelimit-remaining')
  return remaining !== null && Number(remaining) <= 0
}

async function readError(response) {
  let message = `GitHub API request failed (${response.status})`
  try {
    const body = await response.json()
    if (body?.message) message = body.message
  } catch {
    /* non-JSON error body */
  }
  return message
}

export async function githubFetch(path, { params = {}, ignoreStatuses = [] } = {}) {
  const url = new URL(`${API_BASE}${path}`)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value))
    }
  })

  const response = await fetch(url.toString(), { headers: buildHeaders() })

  if (response.status === 403 || response.status === 429 || isRateLimited(response)) {
    throw new GitHubError('GitHub API rate limit exceeded. Please try again later or add a token.', {
      status: response.status,
      rateLimited: true,
    })
  }

  if (ignoreStatuses.includes(response.status)) {
    return null
  }

  if (response.status === 404) {
    throw new GitHubError('The requested GitHub resource was not found.', {
      status: 404,
      notFound: true,
    })
  }

  if (!response.ok) {
    throw new GitHubError(await readError(response), { status: response.status })
  }

  return response.json()
}

export async function githubFetchAll(path, { params = {}, perPage = 100, maxPages = 3 } = {}) {
  const all = []
  for (let page = 1; page <= maxPages; page++) {
    const data = await githubFetch(path, {
      params: { ...params, page, per_page: perPage },
    })
    if (!Array.isArray(data)) break
    all.push(...data)
    if (data.length < perPage) break
  }
  return all
}
