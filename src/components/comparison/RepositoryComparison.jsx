import Card from '../common/Card.jsx'
import RepositoryCompareCard from './RepositoryCompareCard.jsx'
import MetricComparison from './MetricComparison.jsx'
import LanguageBadge from '../common/LanguageBadge.jsx'
import { computeRepoLanguages } from '../../utils/analytics.js'
import { formatNumber, formatSize, formatAge } from '../../utils/formatters.js'

const DAY = 24 * 60 * 60 * 1000
const na = (v) => (v == null ? 'N/A' : v)

function summarize(repository) {
  const repo = repository.repo
  const daysSincePush = Math.floor((Date.now() - new Date(repo.pushed_at).getTime()) / DAY)
  const ageDays = Math.floor((Date.now() - new Date(repo.created_at).getTime()) / DAY)
  const contributors = Array.isArray(repository.contributors) ? repository.contributors.length : null
  const commitTotal = Array.isArray(repository.commitActivity)
    ? repository.commitActivity.reduce((sum, week) => sum + (week.total || 0), 0)
    : null

  return {
    stars: repo.stargazers_count || 0,
    forks: repo.forks_count || 0,
    watchers: repo.watchers_count || 0,
    issues: repo.open_issues_count || 0,
    size: repo.size || 0,
    ageDays,
    daysSincePush,
    contributors,
    commitTotal,
  }
}

export default function RepositoryComparison({ repositoryA, repositoryB }) {
  const a = summarize(repositoryA)
  const b = summarize(repositoryB)
  const langsA = computeRepoLanguages(repositoryA.languages).slice(0, 6)
  const langsB = computeRepoLanguages(repositoryB.languages).slice(0, 6)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <RepositoryCompareCard repository={repositoryA} />
        <RepositoryCompareCard repository={repositoryB} />
      </div>

      <Card className="p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Head-to-head
        </h3>
        <div className="divide-y divide-slate-100">
          <MetricComparison label="Stars" aValue={a.stars} bValue={b.stars} format={formatNumber} />
          <MetricComparison label="Forks" aValue={a.forks} bValue={b.forks} format={formatNumber} />
          <MetricComparison label="Watchers" aValue={a.watchers} bValue={b.watchers} format={formatNumber} />
          <MetricComparison label="Open issues" aValue={a.issues} bValue={b.issues} format={formatNumber} />
          <MetricComparison label="Size" aValue={a.size} bValue={b.size} format={formatSize} />
          <MetricComparison label="Age" aValue={a.ageDays} bValue={b.ageDays} format={formatAge} />
          <MetricComparison
            label="Days since push"
            aValue={a.daysSincePush}
            bValue={b.daysSincePush}
            format={(v) => (v == null ? 'N/A' : `${v} d`)}
          />
          <MetricComparison
            label="Contributors"
            aValue={a.contributors}
            bValue={b.contributors}
            format={na}
          />
          <MetricComparison
            label="Commits (last year)"
            aValue={a.commitTotal}
            bValue={b.commitTotal}
            format={na}
          />
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Contributors and commit counts come from GitHub's stats endpoints, which are computed
          asynchronously and may be temporarily unavailable (shown as N/A).
        </p>
      </Card>

      <Card className="p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Languages
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <LangColumn title="Repository A" langs={langsA} />
          <LangColumn title="Repository B" langs={langsB} />
        </div>
      </Card>
    </div>
  )
}

function LangColumn({ title, langs }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">{title}</p>
      {langs.length ? (
        <ul className="space-y-2">
          {langs.map((lang) => (
            <li key={lang.language} className="flex items-center justify-between text-sm">
              <LanguageBadge language={lang.language} />
              <span className="text-slate-400">{lang.percentage.toFixed(1)}%</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-400">No language data</p>
      )}
    </div>
  )
}
