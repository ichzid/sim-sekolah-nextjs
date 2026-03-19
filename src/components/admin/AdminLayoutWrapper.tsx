'use client'

import { usePathname } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  return (
    <>
      {!isLoginPage && <AdminSidebar />}
      <div className={`flex-1 flex flex-col min-h-screen ${isLoginPage ? '' : 'lg:ml-64'}`}>
        <main className={`flex-1 overflow-auto ${isLoginPage ? '' : 'p-6'}`}>
          {children}
        </main>
      </div>
    </>
  )
}
