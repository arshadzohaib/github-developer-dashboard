import { useMemo, useState } from 'react'
import Card from '../common/Card.jsx'
import EmptyState from '../common/EmptyState.jsx'
import RepositoryCard from './RepositoryCard.jsx'
import { sortRepositories, computeLanguageDistribution } from '../../utils/analytics.js'

const SORT_OPTIONS = [
  { value: 'stars', label: 'Stars' },
  { value: 'forks', label: 'Forks' },
  { value: 'updated', label: 'Recent activity' },
  { value: 'name', label: 'Name' },
]

export default function RepositoryList({ repos }) {
  const [query, setQuery] = useState('')
  const [language, setLanguage] = useState('all')
  const [sort, setSort] = useState('stars')
  const [dir, setDir] = useState('desc')

  const languages = useMemo(
    () => ['all', ...computeLanguageDistribution(repos).map((l) => l.language)],
    [repos],
  )

  const filtered = useMemo(() => {
    let list = repos
    const q = query.trim().toLowerCase()
    if (q) list = list.filter((r) => r.name.toLowerCase().includes(q))
    if (language !== 'all') list = list.filter((r) => r.language === language)
    return sortRepositories(list, sort, dir)
  }, [repos, query, language, sort, dir])

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Repositories ({repos.length})
        </h3>
        <p className="text-xs text-slate-400">
          Showing {filtered.length} {filtered.length === 1 ? 'repo' : 'repos'}
        </p>
      </div>

      <Card className="space-y-3 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end">
          <label className="flex-1">
            <span className="mb-1 block text-xs font-medium text-slate-500">Search name</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by repository name…"
              className="input"
            />
          </label>
          <label className="md:w-48">
            <span className="mb-1 block text-xs font-medium text-slate-500">Language</span>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="input">
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang === 'all' ? 'All languages' : lang}
                </option>
              ))}
            </select>
          </label>
          <label className="md:w-44">
            <span className="mb-1 block text-xs font-medium text-slate-500">Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="input">
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => setDir((d) => (d === 'desc' ? 'asc' : 'desc'))}
            className="btn-secondary md:w-16"
            aria-label="Toggle sort direction"
            title={dir === 'desc' ? 'Descending' : 'Ascending'}
          >
            {dir === 'desc' ? '↓' : '↑'}
          </button>
        </div>

        {repos.length === 0 ? (
          <EmptyState
            title="No public repositories"
            description="This account doesn't have any public repositories to display."
          />
        ) : filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((repo) => (
              <RepositoryCard key={repo.id} repo={repo} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No repositories match"
            description="Try adjusting your search term or language filter."
          />
        )}
      </Card>
    </section>
  )
}
