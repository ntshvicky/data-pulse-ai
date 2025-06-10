// src/api/jd.ts
// ────────────────────────────────────────────────────────────────────────────────
// Upload a single Job Description file (PDF/DOCX). Optionally pass a title.
// Returns { jdId, title, uploadedAt } on success (HTTP 201).
// ────────────────────────────────────────────────────────────────────────────────

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

export async function uploadJD(
  file: File,
  title?: string
): Promise<JDResponse> {
  const formData = new FormData()
  formData.append('file', file)
  if (title) {
    formData.append('title', title)
  }

  // 1) Read the token from localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

  // 2) Build headers—only Authorization (no Content-Type, since Browser sets multipart boundaries)
  const headers: HeadersInit = {}
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

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
          ? err.detail.map((d: { msg: unknown }) => d.msg).join(', ')
          : JSON.stringify(err)
        : err.message || `JD upload failed (status ${resp})`
    )
  }

  return resp.json() as Promise<JDResponse>
}




// ——————————————————————————————————————————————————————————————
//  Fetch all JDs for “Search in Database” mode
// ——————————————————————————————————————————————————————————————
export async function listJDs(): Promise<JDListItem[]> {
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('accessToken')
    : null

  const headers: HeadersInit = {}
  if (token) headers['Authorization'] = `Bearer ${token}`

  const resp = await fetch(`${API_BASE_URL}/v1/jds`, {
    method: 'GET',
    headers,
  })

  if (!resp.ok) throw new Error(`Failed to load JDs (${resp.status})`)
  return resp.json() as Promise<JDListItem[]>
}

// ——————————————————————————————————————————————————————————————
//  Fetch a single JD’s metadata (and title) by id
// ——————————————————————————————————————————————————————————————
export async function getJDById(jdId: string): Promise<JDResponse> {
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('accessToken')
    : null

  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const resp = await fetch(`${API_BASE_URL}/v1/jds/${jdId}`, {
    method: 'GET',
    headers,
  })
  if (!resp.ok) throw new Error(`Failed to load JD (${resp.status})`)
  return resp.json() as Promise<JDResponse>
}