import type { Metadata } from 'next'
import LoginForm from '@/components/admin/LoginForm'

export const metadata: Metadata = { title: 'Login Admin' }

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg,#0a1a4e,#0f2557,#1a3a80)' }}>

      {/* Orb dekoratif */}
      <div className="absolute w-96 h-96 rounded-full opacity-30 top-10 right-10"
        style={{ background: 'radial-gradient(circle, rgba(200,151,42,0.3) 0%, transparent 70%)', position: 'fixed' }} />
      <div className="absolute w-72 h-72 rounded-full opacity-20 bottom-20 left-10"
        style={{ background: 'radial-gradient(circle, rgba(200,151,42,0.2) 0%, transparent 70%)', position: 'fixed' }} />

      <div className="w-full max-w-md mx-4 relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4"
            style={{ background: 'linear-gradient(135deg,#c8972a,#e6b84a)', boxShadow: '0 8px 32px rgba(200,151,42,0.4)' }}>
            <i className="fas fa-graduation-cap text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-black text-white"
            style={{ fontFamily: 'var(--font-playfair),serif' }}>
            Admin Panel
          </h1>
          <p className="text-white/50 text-sm mt-1">SD Muhammadiyah Danau Sijabut</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}>
          <h2 className="text-xl font-bold text-white mb-6">Masuk ke Akun Anda</h2>
          <LoginForm />
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          SIM Sekolah v1.0 • Hak Cipta Dilindungi
        </p>
      </div>
    </div>
  )
}
