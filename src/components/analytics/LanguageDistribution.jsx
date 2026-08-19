import Card from '../common/Card.jsx'
import EmptyState from '../common/EmptyState.jsx'
import LanguageBadge from '../common/LanguageBadge.jsx'
import { computeLanguageDistribution } from '../../utils/analytics.js'
import { languageColor } from '../../utils/constants.js'

export default function LanguageDistribution({ repos }) {
  const languages = computeLanguageDistribution(repos)

  if (!languages.length) {
    return (
      <Card className="p-5">
        <SectionTitle>Language Distribution</SectionTitle>
        <EmptyState
          className="mt-4"
          title="No language data"
          description="This developer's repositories don't report a primary language."
        />
      </Card>
    )
  }

  return (
    <Card className="p-5">
      <SectionTitle>Language Distribution</SectionTitle>
      <div className="mt-4 space-y-3">
        {languages.map((lang) => (
          <div key={lang.language}>
            <div className="flex items-center justify-between text-sm">
              <LanguageBadge language={lang.language} />
              <span className="text-slate-500">
                {lang.count} {lang.count === 1 ? 'repo' : 'repos'} · {lang.percentage.toFixed(1)}%
              </span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full"
                style={{ width: `${lang.percentage}%`, backgroundColor: languageColor(lang.language) }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-400">
        Calculated from the primary language of each non-fork repository.
      </p>
    </Card>
  )
}

function SectionTitle({ children }) {
  return <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">{children}</h3>
}
