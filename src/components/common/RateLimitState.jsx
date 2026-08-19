export default function RateLimitState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-amber-200 bg-amber-50 px-6 py-12 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-500">
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
          <path
            d="M12 8v5m0 3h.01M10.3 3.9 2.4 17a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-amber-800">GitHub API rate limit reached</h3>
      <p className="mt-1 max-w-md text-sm text-amber-700">
        {message || 'Too many requests. GitHub allows unauthenticated requests only for a limited window.'}
      </p>
      <p className="mt-2 max-w-md text-xs text-amber-600">
        Tip: add a token via <code className="rounded bg-amber-100 px-1">VITE_GITHUB_TOKEN</code> in your
        <code className="rounded bg-amber-100 px-1">.env</code> file to raise the limit.
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary mt-4 bg-amber-600 hover:bg-amber-700">
          Try again
        </button>
      )}
    </div>
  )
}
