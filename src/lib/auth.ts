import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { decodeSession, encodeSession, SESSION_COOKIE, SESSION_MAX_AGE } from '@/lib/session'

export interface SessionUser {
  id: number
  email: string
  nama: string
  role: string
}

export async function createSession(user: SessionUser) {
  const payload = encodeSession(user)
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, payload, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  })
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(SESSION_COOKIE)
  return decodeSession(cookie?.value)
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

// Gunakan di Server Component/Action — redirect jika belum login
export async function requireAdmin(): Promise<SessionUser> {
  const session = await getSession()
  if (!session || session.role !== 'admin') redirect('/admin/login')
  return session
}
