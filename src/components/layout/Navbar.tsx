'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/profil', label: 'Profil' },
  { href: '/guru-staf', label: 'Guru & Staf' },
  { href: '/berita', label: 'Berita' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/unduhan', label: 'Unduhan' },
  { href: '/ppdb', label: 'PPDB' },
  { href: '/kontak', label: 'Kontak' },
]

export default function Navbar({ info }: { info: { nama: string, singkatan: string } }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHome = pathname === '/'
  const navBg = scrolled || !isHome
    ? 'rgba(15,37,87,0.97)'
    : 'transparent'
  const navShadow = scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none'

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: navBg, boxShadow: navShadow }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#c8972a,#e6b84a)' }}
          >
            <i className="fas fa-graduation-cap text-white text-xl" />
          </div>
          <div>
            <p
              className="text-white font-bold text-sm leading-tight"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              {info.nama}
            </p>
            <p className="text-xs" style={{ color: '#e6b84a' }}>
              {info.singkatan}
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 text-sm text-white font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link transition-colors hover:text-yellow-300 ${
                pathname === link.href ? 'text-yellow-300' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA & Hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/ppdb"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 text-white"
            style={{ background: '#c8972a' }}
          >
            <i className="fas fa-star text-xs" /> Daftar PPDB
          </Link>
          <button
            id="hamburger"
            className="lg:hidden text-white text-xl p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobileMenu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-screen' : 'max-h-0'
        }`}
        style={{ background: 'rgba(15,37,87,0.98)' }}
      >
        <div className="px-6 py-4 flex flex-col gap-1 text-white text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-3 border-b border-white/10 hover:text-yellow-300 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/ppdb"
            className="mt-3 py-3 px-4 rounded-xl text-center font-bold text-white"
            style={{ background: '#c8972a' }}
            onClick={() => setMenuOpen(false)}
          >
            Daftar PPDB Sekarang
          </Link>
        </div>
      </div>
    </nav>
  )
}
