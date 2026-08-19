import { useState, useEffect, useCallback } from 'react'
import {
  getRepository,
  getRepositoryLanguages,
  getRepositoryContributors,
  getRepositoryStatsCommitActivity,
} from '../api/githubService'

const IDLE = { repo: null, languages: {}, contributors: [], commitActivity: null, loading: false, error: null }

export function useRepositoryData(slug) {
  const [state, setState] = useState(IDLE)

  const load = useCallback(async () => {
    if (!slug) {
      setState(IDLE)
      return
    }
    const parts = slug.split('/').map((p) => p.trim())
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      setState({ ...IDLE, error: new Error('Enter the repository as owner/repo') })
      return
    }
    const [owner, repoName] = parts
    setState((s) => ({ ...s, loading: true, error: null }))
    try {
      const [repo, languages, contributors, commitActivity] = await Promise.all([
        getRepository(owner, repoName),
        getRepositoryLanguages(owner, repoName),
        getRepositoryContributors(owner, repoName).catch(() => []),
        getRepositoryStatsCommitActivity(owner, repoName).catch(() => null),
      ])
      setState({ repo, languages, contributors, commitActivity, loading: false, error: null })
    } catch (err) {
      setState({ ...IDLE, loading: false, error: err })
    }
  }, [slug])

  useEffect(() => {
    load()
  }, [load])

  return { ...state, refetch: load }
}
