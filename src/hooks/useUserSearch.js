import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { searchUsers } from '../api/githubService'

export function useUserSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e?.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    setLoading(true)
    setError(null)
    setHasSearched(true)
    try {
      const data = await searchUsers(trimmed, { perPage: 8 })
      setResults(data.items ?? [])
    } catch (err) {
      setError(err)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setQuery('')
    setResults([])
    setError(null)
    setHasSearched(false)
  }

  const openDashboard = (username) => navigate(`/dashboard/${username}`)

  return { query, setQuery, results, loading, error, hasSearched, submit, reset, openDashboard }
}
