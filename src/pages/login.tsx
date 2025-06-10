// pages/login.tsx
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { loginUser } from './api/auth'  // <-- our API helper

interface LoginResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
  user: {
    userId: string
    fullName: string
    email: string
    role: string
  }
}

export default function Login() {
  const router = useRouter()

  // Controlled form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setLoading(true)

    try {
      const resp = await loginUser({ email, password })

      if (resp.ok && resp.status === 200) {
        const data: LoginResponse = await resp.json()
        // Save tokens to localStorage (or cookies, if you prefer)
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
        // Optionally save user info if needed
        localStorage.setItem('user', JSON.stringify(data.user))

        // Redirect to dashboard (or anywhere else)
        router.push('/dashboard')
      } else {
        const data = await resp.json()
        if (data.detail) {
          // FastAPI-style validation errors (422)
          const firstError = Array.isArray(data.detail) ? data.detail[0] : null
          setErrorMessage(
            firstError
              ? `${firstError.loc.join(' -> ')}: ${firstError.msg}`
              : JSON.stringify(data)
          )
        } else if (data.message) {
          setErrorMessage(data.message)
        } else {
          setErrorMessage(`Login failed (status ${resp.status})`)
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>AI Chat System - Login</title>
      </Head>

      <div className="bg-light">
        <div className="container vh-100 d-flex align-items-center justify-content-center">
          <div className="card p-4 shadow" style={{ maxWidth: 400, width: '100%' }}>
            <h3 className="text-center mb-4">AI Chat System</h3>

            <form onSubmit={handleSubmit}>
              {/* Email / Username */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Username / Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your username or email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Links */}
              <div className="d-flex justify-content-between mb-3">
                <Link href="/forget-password" className="small">
                  Forgot Password?
                </Link>
                <Link href="/register" className="small">
                  Create an Account
                </Link>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Logging in…' : 'Login'}
              </button>
            </form>

            {/* Error Message */}
            {errorMessage && (
              <div className="alert alert-danger mt-3" role="alert">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
