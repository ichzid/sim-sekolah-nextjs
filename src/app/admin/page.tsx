import type { Metadata } from 'next'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getStatistik } from '@/actions/sekolah'
import { getBerita } from '@/actions/berita'

export const metadata: Metadata = { title: 'Dashboard Admin' }

export default async function AdminDashboard() {
  await requireAdmin()
  const stats = await getStatistik()
  const beritaTerbaru = await getBerita()
  const recent = beritaTerbaru.slice(0, 5)

  const statCards = [
    { icon: 'fa-newspaper', label: 'Total Berita', nilai: stats.totalBerita, color: '#0f2557', link: '/admin/berita' },
    { icon: 'fa-chalkboard-teacher', label: 'Total Guru & Staf', nilai: stats.totalGuru, color: '#1a6b4a', link: '/admin/guru' },
    { icon: 'fa-user-graduate', label: 'Pendaftar PPDB', nilai: stats.totalPendaftar, color: '#c8972a', link: '/admin/ppdb' },
    { icon: 'fa-globe', label: 'Halaman Publik', nilai: 8, color: '#7c3aed', link: '/' },
  ]

  const menuCards = [
    { icon: 'fa-school', label: 'Info Sekolah', desc: 'Edit profil dan data sekolah', href: '/admin/info-sekolah', color: '#0f2557' },
    { icon: 'fa-newspaper', label: 'Berita', desc: 'Kelola berita dan pengumuman', href: '/admin/berita', color: '#1a6b4a' },
    { icon: 'fa-chalkboard-teacher', label: 'Guru & Staf', desc: 'Kelola data tenaga pengajar', href: '/admin/guru', color: '#c8972a' },
    { icon: 'fa-images', label: 'Galeri', desc: 'Kelola foto-foto kegiatan', href: '/admin/galeri', color: '#7c3aed' },
    { icon: 'fa-file-alt', label: 'Dokumen', desc: 'Kelola file unduhan', href: '/admin/dokumen', color: '#0369a1' },
    { icon: 'fa-user-graduate', label: 'Data PPDB', desc: 'Lihat data calon siswa baru', href: '/admin/ppdb', color: '#be123c' },
  ]

  return (
    <div className="space-y-6 pt-16 lg:pt-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#0f2557', fontFamily: 'var(--font-playfair),serif' }}>
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">Selamat datang di Admin Panel SIM Sekolah</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <Link key={s.label} href={s.link}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: s.color + '18' }}>
                <i className={`fas ${s.icon} text-xl`} style={{ color: s.color }} />
              </div>
              <i className="fas fa-arrow-up-right-from-square text-xs text-gray-300" />
            </div>
            <div className="text-3xl font-black" style={{ color: s.color }}>{s.nilai}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Menu cepat + Berita terbaru */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Menu Cepat */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-lg mb-5" style={{ color: '#0f2557' }}>Menu Cepat</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {menuCards.map((m) => (
              <Link key={m.href} href={m.href}
                className="p-4 rounded-xl border border-gray-100 hover:border-transparent hover:shadow-md transition-all group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: m.color + '18' }}>
                  <i className={`fas ${m.icon}`} style={{ color: m.color }} />
                </div>
                <p className="font-semibold text-sm" style={{ color: '#0f2557' }}>{m.label}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{m.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Berita Terbaru */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-lg" style={{ color: '#0f2557' }}>Berita Terbaru</h2>
            <Link href="/admin/berita" className="text-xs font-semibold hover:underline" style={{ color: '#c8972a' }}>
              Lihat Semua
            </Link>
          </div>
          <div className="space-y-3">
            {recent.length === 0 && (
              <p className="text-gray-400 text-sm">Belum ada berita.</p>
            )}
            {recent.map((b) => (
              <div key={b.id} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: '#0f2557' }}>
                  <i className={`fas ${b.icon ?? 'fa-newspaper'} text-white text-xs`} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">{b.judul}</p>
                  <p className="text-xs text-gray-400">{b.tanggal} · {b.tipe}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/admin/berita"
            className="mt-4 w-full py-2 rounded-xl text-sm font-semibold text-center block transition-all"
            style={{ background: '#0f2557' + '12', color: '#0f2557' }}>
            <i className="fas fa-plus mr-2" />Tambah Berita
          </Link>
        </div>
      </div>
    </div>
  )
}
