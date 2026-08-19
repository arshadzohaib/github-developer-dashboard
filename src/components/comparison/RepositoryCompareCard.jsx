import Card from '../common/Card.jsx'
import LanguageBadge from '../common/LanguageBadge.jsx'
import { formatNumber, formatSize, formatAge, relativeTime } from '../../utils/formatters.js'

export default function RepositoryCompareCard({ repository }) {
  const repo = repository.repo
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="block truncate font-semibold text-brand-700 hover:underline"
          >
            {repo.full_name}
          </a>
          {repo.description && (
            <p className="mt-1 line-clamp-2 text-sm text-slate-600">{repo.description}</p>
          )}
        </div>
        <LanguageBadge language={repo.language} />
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <Stat label="Stars" value={formatNumber(repo.stargazers_count)} />
        <Stat label="Forks" value={formatNumber(repo.forks_count)} />
        <Stat label="Watchers" value={formatNumber(repo.watchers_count)} />
        <Stat label="Open issues" value={formatNumber(repo.open_issues_count)} />
      </dl>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
        <span title="Size">{formatSize(repo.size)}</span>
        <span title="Age">Age {formatAge(repo.created_at)}</span>
        <span title="Last push">Pushed {relativeTime(repo.pushed_at)}</span>
        {repo.license?.spdx_id && repo.license.spdx_id !== 'NOASSERTION' && (
          <span title="License">{repo.license.spdx_id}</span>
        )}
      </div>
    </Card>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 py-2 text-center">
      <dd className="font-semibold text-slate-900">{value}</dd>
      <dt className="text-xs text-slate-500">{label}</dt>
    </div>
  )
}
