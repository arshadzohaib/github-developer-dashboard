import { useUserSearch } from '../../hooks/useUserSearch.js'
import Spinner from '../common/Spinner.jsx'
import UserSearchResult from './UserSearchResult.jsx'
import EmptyState from '../common/EmptyState.jsx'
import ErrorState from '../common/ErrorState.jsx'
import RateLimitState from '../common/RateLimitState.jsx'
import Skeleton from '../common/Skeleton.jsx'

export default function UserSearch() {
  const { query, setQuery, results, loading, error, hasSearched, submit, reset, openDashboard } =
    useUserSearch()

  return (
    <div className="mx-auto w-full max-w-2xl">
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row" role="search">
        <label htmlFor="user-search" className="sr-only">
          GitHub username
        </label>
        <input
          id="user-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a GitHub username…"
          autoComplete="off"
          className="input flex-1"
        />
        <button type="submit" disabled={loading || !query.trim()} className="btn-primary sm:w-32">
          {loading ? <Spinner size="sm" className="text-white" /> : 'Search'}
        </button>
        {hasSearched && !loading && (
          <button type="button" onClick={reset} className="btn-secondary sm:w-24">
            Clear
          </button>
        )}
      </form>

      <div className="mt-6" aria-live="polite">
        {loading && <SearchSkeleton />}

        {!loading && error && (error.rateLimited ? (
          <RateLimitState message={error.message} />
        ) : (
          <ErrorState title="Could not search GitHub" message={error.message} />
        ))}

        {!loading && !error && hasSearched && results.length === 0 && (
          <EmptyState
            title="No users found"
            description="We couldn't find any GitHub users matching that search. Check the spelling and try again."
          />
        )}

        {!loading && !error && results.length > 0 && (
          <ul className="flex flex-col gap-2" data-testid="search-results">
            {results.map((user) => (
              <li key={user.id}>
                <UserSearchResult user={user} onSelect={() => openDashboard(user.login)} />
              </li>
            ))}
          </ul>
        )}

        {!loading && !error && !hasSearched && (
          <p className="text-center text-sm text-slate-400">
            Enter a username above to search GitHub.
          </p>
        )}
      </div>
    </div>
  )
}

function SearchSkeleton() {
  return (
    <ul className="flex flex-col gap-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="card flex items-center gap-3 p-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </li>
      ))}
    </ul>
  )
}
