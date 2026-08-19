export default function BarChart({ data, height = 120, color = '#2563eb' }) {
  const max = Math.max(1, ...data.map((d) => d.value))

  return (
    <div className="flex items-end gap-px" style={{ height }} role="img" aria-label="Bar chart">
      {data.map((d, i) => {
        const pct = (d.value / max) * 100
        return (
          <div
            key={i}
            className="group flex flex-1 flex-col justify-end"
            title={`${d.label}: ${d.value}`}
          >
            <div
              className="w-full rounded-t transition-colors"
              style={{
                height: `${pct}%`,
                minHeight: d.value ? 2 : 0,
                backgroundColor: d.color || color,
                opacity: d.value ? 0.85 : 0.15,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
