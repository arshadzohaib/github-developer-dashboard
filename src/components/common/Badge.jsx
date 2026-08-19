export default function Badge({ color = 'slate', className = '', children }) {
  const colors = {
    slate: 'bg-slate-100 text-slate-700',
    brand: 'bg-brand-100 text-brand-700',
    green: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    red: 'bg-red-100 text-red-700',
  }
  return <span className={`badge ${colors[color] ?? colors.slate} ${className}`}>{children}</span>
}
