import Card from '../common/Card.jsx'
import StatCard from '../common/StatCard.jsx'
import { formatNumber } from '../../utils/formatters'

export default function RepositoryStats({ stats }) {
  return (
    <section className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
        Repository Statistics
      </h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Repositories" value={formatNumber(stats.total)} />
        <StatCard label="Total Stars" value={formatNumber(stats.totalStars)} />
        <StatCard label="Total Forks" value={formatNumber(stats.totalForks)} />
        <StatCard label="Watchers" value={formatNumber(stats.totalWatchers)} />
        <StatCard label="Open Issues" value={formatNumber(stats.openIssues)} />
        <StatCard label="Source / Fork" value={`${stats.byType.source} / ${stats.byType.fork}`} />
      </div>

      <Card className="p-4">
        <p className="text-sm text-slate-600">
          Across <span className="font-semibold text-slate-900">{stats.total}</span> repositories,{' '}
          <span className="font-semibold text-slate-900">{stats.byType.source}</span> are original
          (source) and <span className="font-semibold text-slate-900">{stats.byType.fork}</span> are
          forks. Aggregate stars, forks, and watchers are summed from each repository's real
          counts.
        </p>
      </Card>
    </section>
  )
}
