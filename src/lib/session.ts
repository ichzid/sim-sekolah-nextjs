import { createHmac, timingSafeEqual } from 'node:crypto'

const FALLBACK_SECRET = 'sim-sekolah-secret'
const SESSION_VERSION = 1

export const SESSION_COOKIE = 'sim_session'
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7

interface SessionPayload {
  id: number
  email: string
  nama: string
  role: string
  exp: number
  v: number
}

function getSecret() {
  return process.env.SESSION_SECRET || FALLBACK_SECRET
}

function sign(value: string) {
  return createHmac('sha256', getSecret()).update(value).digest('base64url')
}

export function encodeSession(user: {
  id: number
  email: string
  nama: string
  role: string
}) {
  const payload = Buffer.from(
    JSON.stringify({
      ...user,
      exp: Date.now() + SESSION_MAX_AGE * 1000,
      v: SESSION_VERSION,
    } satisfies SessionPayload)
  ).toString('base64url')

  return `${payload}.${sign(payload)}`
}

export function decodeSession(token?: string | null) {
  if (!token) return null

  const [payload, signature] = token.split('.')
  if (!payload || !signature) return null

  const expectedSignature = sign(payload)
  const validSignature =
    signature.length === expectedSignature.length &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))

  if (!validSignature) return null

  try {
    const data = JSON.parse(
      Buffer.from(payload, 'base64url').toString()
    ) as SessionPayload

    if (data.v !== SESSION_VERSION) return null
    if (data.exp <= Date.now()) return null
    if (data.role !== 'admin') return null

    return {
      id: data.id,
      email: data.email,
      nama: data.nama,
      role: data.role,
    }
  } catch {
    return null
  }
}

export function isValidSessionToken(token?: string | null) {
  return decodeSession(token) !== null
}
