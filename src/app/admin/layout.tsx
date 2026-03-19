import type { Metadata } from 'next'
import AdminLayoutWrapper from '@/components/admin/AdminLayoutWrapper'

export const metadata: Metadata = {
  title: { default: 'Admin Panel', template: '%s | Admin' },
  robots: 'noindex',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex" style={{ background: '#f1f5f9', fontFamily: 'var(--font-dm-sans), sans-serif' }}>
      <AdminLayoutWrapper>
        {children}
      </AdminLayoutWrapper>
    </div>
  )
}
