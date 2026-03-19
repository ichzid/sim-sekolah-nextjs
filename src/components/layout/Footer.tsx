'use client'

import Link from 'next/link'

const navLinks = [
  { href: '/profil', label: 'Profil Sekolah' },
  { href: '/guru-staf', label: 'Guru & Staf' },
  { href: '/berita', label: 'Berita' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/unduhan', label: 'Unduhan' },
  { href: '/ppdb', label: 'PPDB' },
]

interface FooterInfo {
  nama: string
  tahunBerdiri: string
  akreditasi: string
  motto: string
  alamat: string
  kota: string
  telepon: string
  email: string
  jamOperasional: string
  facebookUrl: string
  instagramUrl: string
  youtubeUrl: string
  whatsappUrl: string
}

export default function Footer({ infoSekolah }: { infoSekolah: FooterInfo }) {
  const socialLinks = [
    { icon: 'fab fa-facebook-f', bg: '#1877f2', href: infoSekolah.facebookUrl, label: 'Facebook' },
    { icon: 'fab fa-instagram', bg: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)', href: infoSekolah.instagramUrl, label: 'Instagram' },
    { icon: 'fab fa-youtube', bg: '#ff0000', href: infoSekolah.youtubeUrl, label: 'YouTube' },
    { icon: 'fab fa-whatsapp', bg: '#25d366', href: infoSekolah.whatsappUrl, label: 'WhatsApp' },
  ]

  return (
    <footer style={{ background: '#0f2557' }} className="pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: '#c8972a' }}
              >
                <i className="fas fa-graduation-cap text-white text-xl" />
              </div>
              <div>
                <p
                  className="text-white font-bold"
                  style={{ fontFamily: 'var(--font-playfair), serif' }}
                >
                  {infoSekolah.nama}
                </p>
                <p className="text-xs" style={{ color: '#e6b84a' }}>
                  Est. {infoSekolah.tahunBerdiri} • Terakreditasi {infoSekolah.akreditasi}
                </p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-4">
              {infoSekolah.motto}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-all hover:scale-110"
                  style={{ background: s.bg }}
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
            <div className="gold-line mt-6" />
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm text-white/50">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li className="flex items-start gap-2">
                <i className="fas fa-map-marker-alt mt-0.5 text-xs" style={{ color: '#c8972a' }} />
                {infoSekolah.alamat}, {infoSekolah.kota}
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-phone text-xs" style={{ color: '#c8972a' }} />
                {infoSekolah.telepon}
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-envelope text-xs" style={{ color: '#c8972a' }} />
                {infoSekolah.email}
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-clock text-xs" style={{ color: '#c8972a' }} />
                {infoSekolah.jamOperasional}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} {infoSekolah.nama}. Hak Cipta Dilindungi.
          </p>
          <p className="text-white/20 text-xs">
            Dibuat dengan <i className="fas fa-heart text-red-400 mx-1" /> untuk pendidikan Indonesia
          </p>
        </div>
      </div>
    </footer>
  )
}
