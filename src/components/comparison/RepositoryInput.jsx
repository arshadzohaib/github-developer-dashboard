import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RepositoryInput({ label, onSubmit, loading }) {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    const next = value.trim()
    if (next) onSubmit(next)
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2">
      <label htmlFor={`repo-input-${label}`} className="text-xs font-medium text-slate-500">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          id={`repo-input-${label}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="owner/repo"
          className="input"
        />
        <button type="submit" disabled={loading || !value.trim()} className="btn-primary shrink-0">
          {loading ? '…' : 'Load'}
        </button>
      </div>
    </form>
  )
}
