import Skeleton from '../common/Skeleton.jsx'

export default function DashboardSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Skeleton className="h-96 rounded-xl" />
      <div className="space-y-4 lg:col-span-2">
        <Skeleton className="h-5 w-44" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-20 rounded-xl" />
      </div>
    </div>
  )
}
