'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { logoutAction } from '@/actions/auth'

const menuItems = [
  { href: '/admin', icon: 'fa-gauge', label: 'Dashboard', exact: true },
  { href: '/admin/info-sekolah', icon: 'fa-school', label: 'Info Sekolah' },
  { href: '/admin/berita', icon: 'fa-newspaper', label: 'Berita & Pengumuman' },
  { href: '/admin/guru', icon: 'fa-chalkboard-teacher', label: 'Guru & Staf' },
  { href: '/admin/galeri', icon: 'fa-images', label: 'Galeri' },
  { href: '/admin/dokumen', icon: 'fa-file-alt', label: 'Dokumen Unduhan' },
  { href: '/admin/ppdb', icon: 'fa-user-graduate', label: 'Data PPDB' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
        style={{ background: '#0f2557' }}>
        <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-playfair),serif' }}>
          Admin Panel
        </span>
        <button onClick={() => setOpen(!open)} className="text-white p-2">
          <i className={`fas ${open ? 'fa-times' : 'fa-bars'} text-xl`} />
        </button>
      </div>

      {/* Overlay mobile */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 z-40 flex flex-col transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ background: '#0f2557' }}>

        {/* Brand */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: '#c8972a' }}>
              <i className="fas fa-graduation-cap text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight"
                style={{ fontFamily: 'var(--font-playfair),serif' }}>
                SD Muhammadiyah
              </p>
              <p className="text-xs" style={{ color: '#e6b84a' }}>Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <p className="text-white/30 text-xs font-bold uppercase tracking-widest px-6 mb-2">Menu</p>
          {menuItems.map((item) => {
            const active = isActive(item.href, item.exact)
            return (
              <Link key={item.href} href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all ${
                  active ? 'text-white' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                style={active ? { background: 'rgba(200,151,42,0.2)', borderLeft: '3px solid #c8972a' } : {}}>
                <i className={`fas ${item.icon} w-5 text-center ${active ? '' : ''}`}
                  style={active ? { color: '#e6b84a' } : {}} />
                {item.label}
              </Link>
            )
          })}

          <div className="gold-line my-4 mx-6" />
          <p className="text-white/30 text-xs font-bold uppercase tracking-widest px-6 mb-2">Lainnya</p>
          <Link href="/" target="_blank"
            className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-white/60 hover:text-white transition-all">
            <i className="fas fa-globe w-5 text-center" />
            Lihat Website
          </Link>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <form action={logoutAction}>
            <button type="submit"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all">
              <i className="fas fa-sign-out-alt" />
              Keluar
            </button>
          </form>
        </div>
      </aside>
    </>
  )
}
