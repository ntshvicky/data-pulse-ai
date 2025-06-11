// src/api/chat.ts
const API_BASE_URL = 'http://3.208.226.16:8000'

/** Summary info for the chat list */
export interface ChatSummary {
  conversationId: string
  jdId: string
  cvId: string
  messageCount: number
  createdAt: string
  updatedAt: string
  lastMessage: string
}

/** One message in a conversation */
export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

/** Full conversation details */
export interface ChatDetail {
  conversationId: string
  jdId: string
  cvId: string
  userId: string
  messages: ChatMessage[]
  createdAt: string
  updatedAt: string
}

/** Response when starting or continuing a chat */
export interface StartChatResponse {
  conversationId: string
  response: string
  timestamp: string
}

// ────────────────────────────────────────────────────────────────────────────────
// 1) List all conversations
// ────────────────────────────────────────────────────────────────────────────────
export async function listChats(): Promise<{ conversations: ChatSummary[] }> {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('accessToken')
      : null

  const headers: HeadersInit = { Accept: 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const resp = await fetch(`${API_BASE_URL}/v1/chat`, {
    method: 'GET',
    headers,
  })

  if (!resp.ok) {
    throw new Error(`Failed to load chats (status ${resp.status})`)
  }
  return resp.json() as Promise<{ conversations: ChatSummary[] }>
}

// ────────────────────────────────────────────────────────────────────────────────
// 2) Fetch a single conversation’s messages
// ────────────────────────────────────────────────────────────────────────────────
export async function getChatDetail(
  conversationId: string
): Promise<ChatDetail> {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('accessToken')
      : null

  const headers: HeadersInit = { Accept: 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const resp = await fetch(
    `${API_BASE_URL}/v1/chat/${conversationId}`,
    {
      method: 'GET',
      headers,
    }
  )

  if (!resp.ok) {
    throw new Error(`Failed to load conversation (status ${resp.status})`)
  }
  return resp.json() as Promise<ChatDetail>
}

// ────────────────────────────────────────────────────────────────────────────────
// 3) Start a new chat or send a message to an existing one
// ────────────────────────────────────────────────────────────────────────────────
export async function startChat(
  body: {
    conversationId: string
    jdId: string
    cvId: string
    message: string
  }
): Promise<StartChatResponse> {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('accessToken')
      : null

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const resp = await fetch(`${API_BASE_URL}/v1/chat`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  if (!resp.ok) {
    throw new Error(`Failed to send message (status ${resp.status})`)
  }
  return resp.json() as Promise<StartChatResponse>
}

// ────────────────────────────────────────────────────────────────────────────────
// 4) Delete a conversation
// ────────────────────────────────────────────────────────────────────────────────
export async function deleteChat(
  conversationId: string
): Promise<{ message: string }> {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('accessToken')
      : null

  const headers: HeadersInit = { Accept: 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const resp = await fetch(`${API_BASE_URL}/v1/chat/${conversationId}`, {
    method: 'DELETE',
    headers,
  })

  if (!resp.ok) {
    throw new Error(`Failed to delete conversation (status ${resp.status})`)
  }
  return resp.json() as Promise<{ message: string }>
}
