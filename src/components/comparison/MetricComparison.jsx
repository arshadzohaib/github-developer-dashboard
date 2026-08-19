export default function MetricComparison({ label, aValue, bValue, format = (v) => v }) {
  const aNum = aValue ?? 0
  const bNum = bValue ?? 0
  const max = Math.max(aNum, bNum, 1)
  const aPct = (aNum / max) * 100
  const bPct = (bNum / max) * 100

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-2">
      <div className="flex flex-col items-end">
        <span className="text-sm font-semibold text-slate-900">{format(aValue)}</span>
        <div className="mt-1 h-2 w-full max-w-[180px] rounded-full bg-slate-100">
          <div
            className="ml-auto h-full rounded-full bg-brand-500"
            style={{ width: `${aPct}%` }}
          />
        </div>
      </div>

      <span className="px-1 text-center text-xs font-medium text-slate-500">{label}</span>

      <div className="flex flex-col items-start">
        <span className="text-sm font-semibold text-slate-900">{format(bValue)}</span>
        <div className="mt-1 h-2 w-full max-w-[180px] rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-brand-500" style={{ width: `${bPct}%` }} />
        </div>
      </div>
    </div>
  )
}
