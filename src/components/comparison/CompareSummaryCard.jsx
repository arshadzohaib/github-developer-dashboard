import Card from '../common/Card.jsx'
import Badge from '../common/Badge.jsx'
import { calculateDevPulseScore } from '../../utils/scoring.js'
import { formatNumber } from '../../utils/formatters.js'

export default function CompareSummaryCard({ developer }) {
  const { user, repos, events } = developer
  const { score, band } = calculateDevPulseScore({ user, repos, events })

  return (
    <Card className="flex items-center gap-3 p-4">
      <img
        src={user.avatar_url}
        alt={`${user.login} avatar`}
        className="h-14 w-14 rounded-full border border-slate-200"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-slate-900">{user.name || user.login}</p>
        <a
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-brand-600 hover:underline"
        >
          @{user.login}
        </a>
        <p className="mt-0.5 text-xs text-slate-400">
          {formatNumber(user.followers)} followers · {formatNumber(user.public_repos)} repos
        </p>
      </div>
      <div className="text-right">
        <Badge color={band.color}>{band.label}</Badge>
        <p className="mt-1 text-2xl font-bold text-slate-900">{score}</p>
      </div>
    </Card>
  )
}
