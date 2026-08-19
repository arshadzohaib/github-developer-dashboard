import { NavLink } from 'react-router-dom'

export const NAV_ITEMS = [
  { label: 'Dashboard', to: '/' },
  { label: 'Compare Developers', to: '/compare/developers' },
  { label: 'Compare Repos', to: '/compare/repositories' },
]

export function NavLinks({ onNavigate, orientation = 'horizontal' }) {
  const base =
    'rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-slate-900'
  const containerClass =
    orientation === 'horizontal'
      ? 'flex items-center gap-1'
      : 'flex flex-col items-stretch gap-1'

  return (
    <nav className={containerClass}>
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          onClick={onNavigate}
          className={({ isActive }) =>
            `${base} ${
              isActive
                ? 'bg-brand-50 text-brand-700'
                : 'text-slate-600 hover:bg-slate-100'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
