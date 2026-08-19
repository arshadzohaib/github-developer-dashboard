import { languageColor } from '../../utils/constants'

export default function LanguageBadge({ language }) {
  if (!language) return <span className="text-xs text-slate-400">—</span>
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-slate-600">
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: languageColor(language) }} />
      {language}
    </span>
  )
}
