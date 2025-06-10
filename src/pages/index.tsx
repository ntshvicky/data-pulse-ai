// pages/login.tsx
import { FormEvent } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Login() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO: wire up your auth logic here
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
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username / Email
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="Enter your username or email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="d-flex justify-content-between mb-3">
                <Link href="/forgot-password" className="small">
                  Forgot Password?
                </Link>
                <Link href="/register" className="small">
                  Create an Account
                </Link>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
