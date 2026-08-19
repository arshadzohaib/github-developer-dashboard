import { useState, useEffect, useCallback } from 'react'
import { getUser, getUserRepositories, getUserEvents } from '../api/githubService'

export function useDeveloperData(username) {
  const [state, setState] = useState({
    user: null,
    repos: [],
    events: [],
    loading: true,
    error: null,
  })

  const load = useCallback(async () => {
    if (!username) {
      setState({ user: null, repos: [], events: [], loading: false, error: null })
      return
    }
    setState((s) => ({ ...s, loading: true, error: null }))
    try {
      const [user, repos, events] = await Promise.all([
        getUser(username),
        getUserRepositories(username),
        getUserEvents(username),
      ])
      setState({ user, repos, events, loading: false, error: null })
    } catch (err) {
      setState({ user: null, repos: [], events: [], loading: false, error: err })
    }
  }, [username])

  useEffect(() => {
    load()
  }, [load])

  return { ...state, refetch: load }
}
