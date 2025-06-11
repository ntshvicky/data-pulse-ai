// src/api/jd.ts
const API_BASE_URL = 'http://3.208.226.16:8000'

export interface JDResponse {
  jdId: string
  title: string
  uploadedAt: string
  content?: string
}

export interface JDListItem {
  jdId: string
  title: string
  uploadedAt: string
}

// ——————————————————————————————————————————————————————————————
// 1) Upload a new JD (your existing function)
// ——————————————————————————————————————————————————————————————
export async function uploadJD(
  file: File,
  title?: string
): Promise<JDResponse> {
  const formData = new FormData()
  formData.append('file', file)
  if (title) formData.append('title', title)

  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('accessToken')
      : null

  const headers: HeadersInit = {}
  if (token) headers['Authorization'] = `Bearer ${token}`

  const resp = await fetch(`${API_BASE_URL}/v1/jds`, {
    method: 'POST',
    headers,
    body: formData,
  })

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ message: resp.statusText }))
    throw new Error(
      err.detail
        ? Array.isArray(err.detail)
          ? err.detail.map((d: any) => d.msg).join(', ')
          : JSON.stringify(err)
        : err.message || `JD upload failed (status ${resp.status})`
    )
  }

  return resp.json() as Promise<JDResponse>
}

// ——————————————————————————————————————————————————————————————
// 2) List all JDs (GET /v1/jds)
// ——————————————————————————————————————————————————————————————
export async function listJDs(): Promise<JDListItem[]> {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('accessToken')
      : null

  const headers: HeadersInit = { Accept: 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const resp = await fetch(`${API_BASE_URL}/v1/jds`, {
    method: 'GET',
    headers,
  })

  if (!resp.ok) {
    throw new Error(`Failed to fetch JD list (status ${resp.status})`)
  }

  return resp.json() as Promise<JDListItem[]>
}

// ——————————————————————————————————————————————————————————————
// 3) Fetch a specific JD by ID (existing)
// ——————————————————————————————————————————————————————————————
export async function getJDById(jdId: string): Promise<JDResponse> {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('accessToken')
      : null

  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const resp = await fetch(`${API_BASE_URL}/v1/jds/${jdId}`, {
    method: 'GET',
    headers,
  })

  if (!resp.ok) {
    throw new Error(`Failed to fetch JD (status ${resp.status})`)
  }

  return resp.json() as Promise<JDResponse>
}
