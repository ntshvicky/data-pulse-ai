// src/api/analysis.ts
// ────────────────────────────────────────────────────────────────────────────────
// Create or fetch a skill-analysis job.
// ────────────────────────────────────────────────────────────────────────────────

const API_BASE_URL = 'http://3.208.226.16:8000'

export interface AnalysisRequest {
  jdId: string
  cvIds: string[]
  options?: {
    includeScores?: boolean
    language?: string
  }
}

export interface AnalysisResult {
  cvId: string
  matchScore: number | null
  skillsFound: string[]
  missingSkills: string[]
  error: string | null
}

export interface AnalysisResponse {
  analysisId: string
  timestamp: string
  results: AnalysisResult[]
  status: string | null
}

export async function createAnalysis(
  payload: AnalysisRequest
): Promise<AnalysisResponse> {
  // Read token
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const resp = await fetch(`${API_BASE_URL}/v1/analysis`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  })

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ message: resp.statusText }))
    throw new Error(
      err.detail
        ? Array.isArray(err.detail)
          ? err.detail.map((d: any) => d.msg).join(', ')
          : JSON.stringify(err)
        : err.message || `Analysis request failed (status ${resp.status})`
    )
  }

  return resp.json() as Promise<AnalysisResponse>
}

export async function getAnalysisById(
  analysisId: string
): Promise<AnalysisResponse> {
  // Read token
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const resp = await fetch(`${API_BASE_URL}/v1/analysis/${analysisId}`, {
    method: 'GET',
    headers,
  })

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ message: resp.statusText }))
    throw new Error(
      err.detail
        ? Array.isArray(err.detail)
          ? err.detail.map((d: any) => d.msg).join(', ')
          : JSON.stringify(err)
        : err.message || `Fetch analysis failed (status ${resp.status})`
    )
  }

  return resp.json() as Promise<AnalysisResponse>
}