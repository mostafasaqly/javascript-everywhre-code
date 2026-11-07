import { useState } from 'react'
import type { FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router'
import Button from '../components/ui/Button'
import { useAuth } from '../state/authContext'

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const from = (location.state as { from?: string } | null)?.from ?? '/'

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (name.trim() === '' || !email.includes('@')) {
      setError('Enter your name and a valid email.')
      return
    }
    login({ name: name.trim(), email: email.trim() })
    void navigate(from, { replace: true })
  }

  return (
    <div className="login-page">
      <form className="task-form login-form" onSubmit={handleSubmit}>
        <h1 className="login-title">Sign in to TaskFlow</h1>

        <label className="form-field">
          <span>Name</span>
          <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
        </label>

        <label className="form-field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
        </label>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" variant="primary">
          Sign in
        </Button>
        <p className="login-note">Demo only: no password, nothing is sent to a server.</p>
      </form>
    </div>
  )
}

export default LoginPage