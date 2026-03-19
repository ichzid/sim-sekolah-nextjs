'use client'

import { useState } from 'react'
import { loginAction } from '@/actions/auth'

export default function LoginForm() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const formData = new FormData(e.currentTarget)
    const result = await loginAction(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 rounded-xl text-sm text-red-300 flex items-center gap-2"
          style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}>
          <i className="fas fa-exclamation-circle" />
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
        <div className="relative">
          <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
          <input type="email" name="email" required placeholder="admin@sekolah.sch.id"
            className="w-full pl-11 pr-4 py-3 rounded-xl text-white placeholder-white/30 outline-none transition-all"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              fontFamily: 'inherit',
            }} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/70 mb-2">Password</label>
        <div className="relative">
          <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
          <input type={showPass ? 'text' : 'password'} name="password" required placeholder="••••••••"
            className="w-full pl-11 pr-11 py-3 rounded-xl text-white placeholder-white/30 outline-none transition-all"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              fontFamily: 'inherit',
            }} />
          <button type="button" onClick={() => setShowPass(!showPass)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
            <i className={`fas ${showPass ? 'fa-eye-slash' : 'fa-eye'} text-sm`} />
          </button>
        </div>
      </div>

      <button type="submit" disabled={loading}
        className="w-full py-3 rounded-xl font-bold text-white transition-all hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
        style={{ background: 'linear-gradient(135deg,#c8972a,#e6b84a)' }}>
        {loading ? (
          <><i className="fas fa-spinner fa-spin" /> Memproses...</>
        ) : (
          <><i className="fas fa-sign-in-alt" /> Masuk</>
        )}
      </button>

      <p className="text-center text-white/30 text-xs">
        Default: admin@sekolah.sch.id / admin123
      </p>
    </form>
  )
}
