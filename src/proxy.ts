import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isValidSessionToken, SESSION_COOKIE } from '@/lib/session'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isLoginPage = pathname === '/admin/login'
  const isAdminPage = pathname.startsWith('/admin')
  const token = request.cookies.get(SESSION_COOKIE)?.value
  const isAuthenticated = isValidSessionToken(token)

  if (isAdminPage && !isLoginPage && !isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
