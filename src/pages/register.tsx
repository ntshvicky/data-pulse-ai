// src/pages/register.tsx
import { useState, FormEvent } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'                // ← import SweetAlert2
import { registerUser, RegisterPayload } from './api/auth'

export default function Register() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<RegisterPayload['role']>('user')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setLoading(true)

    try {
      const payload: RegisterPayload = { fullName, email, password, role }
      const resp = await registerUser(payload)

      if (resp.ok && resp.status === 200) {
        // optional: pull back the JSON to show the name
        const result = await resp.json()
        await Swal.fire({
          title: 'Registration Successful',
          text: `Welcome, ${result.fullName}!`,
          icon: 'success',
          confirmButtonText: 'OK'
        })
        router.push('/login')
      } else {
        const data = await resp.json()
        if (data.detail) {
          const firstError = Array.isArray(data.detail) ? data.detail[0] : null
          setErrorMessage(
            firstError
              ? `${firstError.loc.join(' -> ')}: ${firstError.msg}`
              : JSON.stringify(data)
          )
        } else if (data.message) {
          setErrorMessage(data.message)
        } else {
          setErrorMessage(`Registration failed (status ${resp.status})`)
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error during registration')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>AI Chat System – Registration</title>
      </Head>
      <div className="bg-light">
        <div className="container vh-100 d-flex align-items-center justify-content-center">
          <div className="card p-4 shadow" style={{ maxWidth: 500, width: '100%' }}>
            <h3 className="text-center mb-4">Create an Account</h3>
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input
                  type="text" id="fullName" className="form-control"
                  placeholder="Enter your name" value={fullName}
                  onChange={(e) => setFullName(e.target.value)} required
                />
              </div>
              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email" id="email" className="form-control"
                  placeholder="name@example.com" value={email}
                  onChange={(e) => setEmail(e.target.value)} required
                />
              </div>
              {/* Role */}
              <div className="mb-3">
                <label htmlFor="role" className="form-label">Role</label>
                <select
                  id="role" className="form-select" value={role}
                  onChange={(e) => setRole(e.target.value as RegisterPayload['role'])}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
              {/* Password */}
              <div className="mb-3">
                <label htmlFor="regPassword" className="form-label">Password</label>
                <input
                  type="password" id="regPassword" className="form-control"
                  placeholder="Enter a secure password" value={password}
                  onChange={(e) => setPassword(e.target.value)} required
                />
              </div>
              {/* Submit */}
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Registering…' : 'Register'}
              </button>
            </form>
            {errorMessage && (
              <div className="alert alert-danger mt-3" role="alert">
                {errorMessage}
              </div>
            )}
            <div className="text-center mt-3">
              <Link href="/login" className="small">
                Already have an account? Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
