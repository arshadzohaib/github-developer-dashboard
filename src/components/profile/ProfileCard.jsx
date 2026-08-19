import Card from '../common/Card.jsx'
import { formatNumber, formatDate } from '../../utils/formatters'

export default function ProfileCard({ user }) {
  const blog = user.blog?.startsWith('http') ? user.blog : user.blog ? `https://${user.blog}` : null

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar_url}
          alt={`${user.login} avatar`}
          className="h-20 w-20 rounded-full border border-slate-200"
        />
        <div className="min-w-0">
          <h2 className="truncate text-xl font-semibold text-slate-900">
            {user.name || user.login}
          </h2>
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-brand-600 hover:underline"
          >
            @{user.login}
          </a>
        </div>
      </div>

      {user.bio && <p className="text-sm text-slate-600">{user.bio}</p>}

      <dl className="grid grid-cols-3 gap-3 text-center">
        <Metric label="Followers" value={formatNumber(user.followers)} />
        <Metric label="Following" value={formatNumber(user.following)} />
        <Metric label="Repos" value={formatNumber(user.public_repos)} />
      </dl>

      <ul className="space-y-1.5 text-sm text-slate-600">
        {user.company && <Row label="Company" value={user.company} />}
        {user.location && <Row label="Location" value={user.location} />}
        {blog && (
          <li className="flex gap-2">
            <span className="w-20 shrink-0 text-slate-400">Blog</span>
            <a href={blog} target="_blank" rel="noreferrer" className="truncate text-brand-600 hover:underline">
              {user.blog}
            </a>
          </li>
        )}
        <li className="flex gap-2">
          <span className="w-20 shrink-0 text-slate-400">Joined</span>
          <span>{formatDate(user.created_at)}</span>
        </li>
      </ul>

      <a href={user.html_url} target="_blank" rel="noreferrer" className="btn-secondary w-full">
        View profile on GitHub
      </a>
    </Card>
  )
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 py-2">
      <dd className="text-lg font-semibold text-slate-900">{value}</dd>
      <dt className="text-xs text-slate-500">{label}</dt>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <li className="flex gap-2">
      <span className="w-20 shrink-0 text-slate-400">{label}</span>
      <span className="truncate">{value}</span>
    </li>
  )
}
