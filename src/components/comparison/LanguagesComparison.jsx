import LanguageBadge from '../common/LanguageBadge.jsx'
import { computeLanguageDistribution } from '../../utils/analytics.js'

export default function LanguagesComparison({ reposA, reposB }) {
  const langsA = computeLanguageDistribution(reposA).slice(0, 6)
  const langsB = computeLanguageDistribution(reposB).slice(0, 6)

  return (
    <div className="grid grid-cols-2 gap-6">
      <Column title="Developer A" langs={langsA} />
      <Column title="Developer B" langs={langsB} />
    </div>
  )
}

function Column({ title, langs }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">{title}</p>
      {langs.length ? (
        <ul className="space-y-2">
          {langs.map((lang) => (
            <li key={lang.language} className="flex items-center justify-between text-sm">
              <LanguageBadge language={lang.language} />
              <span className="text-slate-400">{lang.count}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-400">No language data</p>
      )}
    </div>
  )
}
