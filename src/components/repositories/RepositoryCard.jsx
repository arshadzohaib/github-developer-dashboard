import Card from '../common/Card.jsx'
import LanguageBadge from '../common/LanguageBadge.jsx'
import Tooltip from '../common/Tooltip.jsx'
import { formatNumber, formatDate, relativeTime, formatSize } from '../../utils/formatters.js'

export default function RepositoryCard({ repo }) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="block truncate font-medium text-brand-700 hover:underline"
          >
            {repo.name}
          </a>
          {repo.description && (
            <p className="mt-1 line-clamp-2 text-sm text-slate-600">{repo.description}</p>
          )}
        </div>
        <LanguageBadge language={repo.language} />
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm sm:grid-cols-4">
        <Metric label="Stars" value={formatNumber(repo.stargazers_count)} />
        <Metric label="Forks" value={formatNumber(repo.forks_count)} />
        <Metric label="Watchers" value={formatNumber(repo.watchers_count)} />
        <Metric
          label={
            <Tooltip text="GitHub's open issues count also includes open pull requests.">Open</Tooltip>
          }
          value={formatNumber(repo.open_issues_count)}
        />
      </dl>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
        <span title="Created">Created {formatDate(repo.created_at)}</span>
        <span title="Last updated">Updated {relativeTime(repo.pushed_at || repo.updated_at)}</span>
        <span title="Size">{formatSize(repo.size)}</span>
        {repo.license?.spdx_id && repo.license.spdx_id !== 'NOASSERTION' && (
          <span title="License">{repo.license.spdx_id}</span>
        )}
      </div>
    </Card>
  )
}

function Metric({ label, value }) {
  return (
    <div className="flex items-center gap-1.5">
      <dt className="text-slate-400">{label}</dt>
      <dd className="font-medium text-slate-700">{value}</dd>
    </div>
  )
}
