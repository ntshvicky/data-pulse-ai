// src/api/cv.ts
// ────────────────────────────────────────────────────────────────────────────────
// Upload a single CV (PDF/DOCX) along with its “level” (jr/mid/sr).
// Returns { cvId, fileName, level, uploadedAt } on success (HTTP 201).
// ────────────────────────────────────────────────────────────────────────────────

const API_BASE_URL = 'http://3.208.226.16:8000'

export interface CVResponse {
  cvId: string
  fileName: string
  level: string
  uploadedAt: string
}

// ────────────────────────────────────────────────────────────────────────────────
// Represents one CV record as returned by GET /v1/cvs
// ────────────────────────────────────────────────────────────────────────────────
export interface CVListItem {
  cvId: string
  fileName: string
  level: string
  uploadedAt: string
}

// ────────────────────────────────────────────────────────────────────────────────
// 1) Upload a new CV
// ────────────────────────────────────────────────────────────────────────────────
export async function uploadCV(
  file: File,
  level: 'jr' | 'mid' | 'sr'
): Promise<CVResponse> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('level', level)

  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('accessToken')
      : null

  const headers: HeadersInit = {}
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const resp = await fetch(`${API_BASE_URL}/v1/cvs`, {
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
        : err.message || `CV upload failed (status ${resp.status})`
    )
  }

  return resp.json() as Promise<CVResponse>
}

// ────────────────────────────────────────────────────────────────────────────────
// 2) List all CVs (GET /v1/cvs)
// ────────────────────────────────────────────────────────────────────────────────
export async function listCVs(): Promise<CVListItem[]> {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('accessToken')
      : null

  const headers: HeadersInit = { 'Accept': 'application/json' }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const resp = await fetch(`${API_BASE_URL}/v1/cvs`, {
    method: 'GET',
    headers,
  })

  if (!resp.ok) {
    throw new Error(`Failed to fetch CV list (status ${resp.status})`)
  }

  return resp.json() as Promise<CVListItem[]>
}
