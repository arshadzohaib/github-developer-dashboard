import Card from '../common/Card.jsx'
import Badge from '../common/Badge.jsx'
import ProgressBar from '../common/ProgressBar.jsx'
import { calculateDevPulseScore } from '../../utils/scoring.js'

const RING_COLOR = {
  green: '#10b981',
  brand: '#2563eb',
  amber: '#f59e0b',
  red: '#ef4444',
}

export default function DevPulseScore({ user, repos, events }) {
  const { score, band, factors, explanation } = calculateDevPulseScore({ user, repos, events })
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - score / 100)
  const ringColor = RING_COLOR[band.color]

  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">DevPulse Score</h3>

      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
        <div className="relative h-32 w-32 shrink-0">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={ringColor}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-slate-900">{score}</span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <Badge color={band.color}>{band.label}</Badge>
          <p className="mt-2 text-sm text-slate-600">{explanation}</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {factors.map((factor) => (
          <div key={factor.key}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">{factor.label}</span>
              <span className="text-slate-400">
                {factor.points.toFixed(1)} / {factor.max}
              </span>
            </div>
            <ProgressBar
              value={factor.points}
              max={factor.max}
              color={band.color}
              className="mt-1"
            />
            <p className="mt-1 text-xs text-slate-400">{factor.description}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
