// pages/forgot-password.tsx
import { FormEvent } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function ForgotPassword() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO: wire up your password-reset logic here
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>AI Chat System - Forgot Password</title>
      </Head>

      <div className="bg-light">
        <div className="container vh-100 d-flex align-items-center justify-content-center">
          <div className="card p-4 shadow" style={{ maxWidth: 400, width: '100%' }}>
            <h3 className="text-center mb-4">Forgot Password</h3>
            <p className="text-muted text-center">
              Enter your email to receive a password reset link.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="resetEmail" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  id="resetEmail"
                  className="form-control"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Send Reset Link
              </button>
            </form>

            <div className="text-center mt-3">
              <Link href="/login" className="small">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
