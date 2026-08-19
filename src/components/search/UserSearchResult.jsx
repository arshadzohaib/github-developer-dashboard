export default function UserSearchResult({ user, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="card flex w-full items-center gap-3 p-3 text-left transition-colors hover:border-brand-300 hover:bg-brand-50/40"
    >
      <img
        src={user.avatar_url}
        alt={`${user.login} avatar`}
        loading="lazy"
        className="h-10 w-10 shrink-0 rounded-full border border-slate-200"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-slate-900">{user.login}</p>
        <p className="truncate text-xs capitalize text-slate-500">{user.type}</p>
      </div>
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-slate-300" fill="none" aria-hidden="true">
        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
