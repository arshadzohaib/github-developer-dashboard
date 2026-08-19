import Card from '../common/Card.jsx'
import CompareSummaryCard from './CompareSummaryCard.jsx'
import MetricComparison from './MetricComparison.jsx'
import LanguagesComparison from './LanguagesComparison.jsx'
import { computeRepositoryStats, computeEventActivity } from '../../utils/analytics.js'
import { calculateDevPulseScore } from '../../utils/scoring.js'
import { formatNumber } from '../../utils/formatters.js'

function summarize(developer) {
  const stats = computeRepositoryStats(developer.repos)
  const activity = computeEventActivity(developer.events)
  const { score } = calculateDevPulseScore(developer)
  return {
    followers: developer.user.followers || 0,
    following: developer.user.following || 0,
    publicRepos: developer.user.public_repos || 0,
    stars: stats.totalStars,
    forks: stats.totalForks,
    devPulse: score,
    events: activity.total,
    consistency: activity.consistency,
  }
}

export default function DeveloperComparison({ developerA, developerB }) {
  const a = summarize(developerA)
  const b = summarize(developerB)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <CompareSummaryCard developer={developerA} />
        <CompareSummaryCard developer={developerB} />
      </div>

      <Card className="p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Head-to-head
        </h3>
        <div className="divide-y divide-slate-100">
          <MetricComparison label="Followers" aValue={a.followers} bValue={b.followers} format={formatNumber} />
          <MetricComparison label="Following" aValue={a.following} bValue={b.following} format={formatNumber} />
          <MetricComparison label="Public repos" aValue={a.publicRepos} bValue={b.publicRepos} format={formatNumber} />
          <MetricComparison label="Total stars" aValue={a.stars} bValue={b.stars} format={formatNumber} />
          <MetricComparison label="Total forks" aValue={a.forks} bValue={b.forks} format={formatNumber} />
          <MetricComparison label="DevPulse score" aValue={a.devPulse} bValue={b.devPulse} />
          <MetricComparison label="Public events (90d)" aValue={a.events} bValue={b.events} format={formatNumber} />
          <MetricComparison label="Activity consistency" aValue={a.consistency} bValue={b.consistency} />
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Top Languages
        </h3>
        <LanguagesComparison reposA={developerA.repos} reposB={developerB.repos} />
      </Card>
    </div>
  )
}
