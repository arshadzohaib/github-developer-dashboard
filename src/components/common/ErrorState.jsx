import { Link } from 'react-router-dom'

export default function ErrorState({ title = 'Something went wrong', message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 px-6 py-12 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-500">
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
          <path d="M12 8v5m0 3h.01M10.3 3.9 2.4 17a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-red-800">{title}</h3>
      {message && <p className="mt-1 max-w-md text-sm text-red-600">{message}</p>}
      {onRetry && (
        <button onClick={onRetry} className="btn-primary mt-4">
          Try again
        </button>
      )}
      {!onRetry && (
        <Link to="/" className="btn-secondary mt-4">
          Back to search
        </Link>
      )}
    </div>
  )
}
