import { useState } from 'react'

export default function Tooltip({ text, children, className = '' }) {
  const [open, setOpen] = useState(false)
  return (
    <span
      className={`group relative inline-flex ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
      aria-label={text}
    >
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-max max-w-[16rem] -translate-x-1/2 rounded-md bg-slate-900 px-2.5 py-1.5 text-center text-xs leading-snug text-white shadow-lg transition-opacity ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {text}
      </span>
    </span>
  )
}
