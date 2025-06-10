// src/api/auth.ts
// ----------------
// Export every auth-related function here. Each function returns the raw Response
// so the caller (e.g. the page) can check status, parse JSON, and handle errors.

const API_BASE_URL = 'http://3.208.226.16:8000' // if your backend is on the same origin, keep this ''. 
                       // Otherwise set to e.g. 'https://api.yourdomain.com'

export interface RegisterPayload {
  fullName: string
  email: string
  password: string
  role: 'user' | 'admin' | 'manager'
}

export interface LoginPayload {
  email: string
  password: string
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  token: string
  newPassword: string
}

// ────────────────────────────────────────────────────────────────────────────────
// 1) Register new user
// ────────────────────────────────────────────────────────────────────────────────
export async function registerUser(
  payload: RegisterPayload
): Promise<Response> {
  return fetch(`${API_BASE_URL}/v1/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

// ────────────────────────────────────────────────────────────────────────────────
// 2) Login user
// ────────────────────────────────────────────────────────────────────────────────
export async function loginUser(
  payload: LoginPayload
): Promise<Response> {
  return fetch(`${API_BASE_URL}/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

// ────────────────────────────────────────────────────────────────────────────────
// 3) Forgot password
// ────────────────────────────────────────────────────────────────────────────────
export async function forgotPassword(
  payload: ForgotPasswordPayload
): Promise<Response> {
  return fetch(`${API_BASE_URL}/v1/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

// ────────────────────────────────────────────────────────────────────────────────
// 4) Reset password
// ────────────────────────────────────────────────────────────────────────────────
export async function resetPassword(
  payload: ResetPasswordPayload
): Promise<Response> {
  return fetch(`${API_BASE_URL}/v1/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}
