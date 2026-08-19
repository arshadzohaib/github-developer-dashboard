import Card from '../common/Card.jsx'
import EmptyState from '../common/EmptyState.jsx'
import BarChart from '../charts/BarChart.jsx'
import { computeEventActivity } from '../../utils/analytics.js'
import { relativeTime } from '../../utils/formatters.js'

const EVENT_LABELS = {
  PushEvent: 'Pushes',
  PullRequestEvent: 'Pull requests',
  IssuesEvent: 'Issues',
  IssueCommentEvent: 'Issue comments',
  WatchEvent: 'Stars given',
  ForkEvent: 'Forks',
  CreateEvent: 'Creates',
  DeleteEvent: 'Deletes',
  PublicEvent: 'Made public',
  ReleaseEvent: 'Releases',
  PullRequestReviewEvent: 'PR reviews',
  CommitCommentEvent: 'Commit comments',
  MemberEvent: 'Member changes',
  FollowEvent: 'Follows',
}

function eventLabel(type) {
  return EVENT_LABELS[type] || type.replace('Event', '')
}

export default function ContributionActivity({ events }) {
  const activity = computeEventActivity(events)

  if (!activity.total) {
    return (
      <Card className="p-5">
        <SectionTitle>Contribution Activity</SectionTitle>
        <EmptyState
          className="mt-4"
          title="No recent public activity"
          description="This account has no public events in the window GitHub exposes via its API."
        />
      </Card>
    )
  }

  const chartData = activity.perDay.slice(-30).map((d) => ({ label: d.date.slice(5), value: d.count }))
  const maxType = Math.max(1, ...activity.byType.map((t) => t.count))

  return (
    <Card className="p-5">
      <SectionTitle>Contribution Activity</SectionTitle>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <MiniStat label="Public events" value={activity.total} />
        <MiniStat label="Active days" value={activity.activeDays} />
        <MiniStat label="Consistency" value={`${activity.consistency}%`} />
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-medium text-slate-500">Daily public events · last 30 days</p>
        <BarChart data={chartData} height={120} />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-medium text-slate-500">Activity by type</p>
          <div className="space-y-2">
            {activity.byType.map((t) => (
              <div key={t.type}>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">{eventLabel(t.type)}</span>
                  <span className="text-slate-400">{t.count}</span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-brand-500"
                    style={{ width: `${(t.count / maxType) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-slate-500">Recent activity</p>
          <ul className="space-y-2">
            {activity.recent.map((event) => (
              <li key={event.id} className="flex items-center justify-between gap-2 text-sm">
                <span className="truncate text-slate-600">
                  <span className="font-medium text-slate-800">{eventLabel(event.type)}</span>
                  {event.repo?.name && (
                    <span className="text-slate-400"> · {event.repo.name}</span>
                  )}
                </span>
                <span className="shrink-0 text-xs text-slate-400">
                  {relativeTime(event.created_at)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-5 text-xs text-slate-400">
        Derived from public events (up to ~90 days via the GitHub REST API). The full contribution
        calendar and per-repository commit totals are not exposed publicly and are intentionally not
        shown.
      </p>
    </Card>
  )
}

function SectionTitle({ children }) {
  return <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">{children}</h3>
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 py-2">
      <dd className="text-lg font-semibold text-slate-900">{value}</dd>
      <dt className="text-xs text-slate-500">{label}</dt>
    </div>
  )
}
