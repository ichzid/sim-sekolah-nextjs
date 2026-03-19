'use server'

import { prisma } from '@/lib/db'
import { createSession, clearSession } from '@/lib/auth'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    return { error: 'Email dan password wajib diisi.' }
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return { error: 'Email atau password salah.' }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return { error: 'Email atau password salah.' }

  await createSession({
    id: user.id,
    email: user.email,
    nama: user.nama,
    role: user.role,
  })

  redirect('/admin')
}

export async function logoutAction() {
  await clearSession()
  redirect('/admin/login')
}
