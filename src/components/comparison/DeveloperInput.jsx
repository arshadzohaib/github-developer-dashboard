import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function DeveloperInput({ label, initialValue = '', onSubmit, loading }) {
  const [value, setValue] = useState(initialValue)
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    const next = value.trim()
    if (next) onSubmit(next)
  }

  const openDashboard = () => {
    const next = value.trim()
    if (next) navigate(`/dashboard/${next}`)
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2">
      <label htmlFor={`dev-input-${label}`} className="text-xs font-medium text-slate-500">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          id={`dev-input-${label}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="username"
          className="input"
        />
        <button type="submit" disabled={loading || !value.trim()} className="btn-primary shrink-0">
          {loading ? '…' : 'Load'}
        </button>
        <button type="button" onClick={openDashboard} disabled={!value.trim()} className="btn-secondary shrink-0">
          Dashboard
        </button>
      </div>
    </form>
  )
}
