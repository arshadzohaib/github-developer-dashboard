import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserSwitch({ initialUsername }) {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    const next = value.trim()
    if (next && next !== initialUsername) navigate(`/dashboard/${next}`)
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`e.g. ${initialUsername}`}
        className="input sm:w-56"
        aria-label="Switch GitHub user"
      />
      <button type="submit" className="btn-secondary shrink-0">
        Go
      </button>
    </form>
  )
}
