import type { Metadata } from 'next'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getBerita } from '@/actions/berita'
import BeritaTable from '@/components/admin/BeritaTable'

export const metadata: Metadata = { title: 'Kelola Berita' }

export default async function AdminBeritaPage() {
  await requireAdmin()
  const semua = await getBerita()

  return (
    <div className="space-y-6 pt-16 lg:pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0f2557', fontFamily: 'var(--font-playfair),serif' }}>
            Berita & Pengumuman
          </h1>
          <p className="text-gray-500 text-sm mt-1">{semua.length} konten tersimpan</p>
        </div>
        <Link href="/admin/berita/tambah"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm"
          style={{ background: '#0f2557' }}>
          <i className="fas fa-plus" /> Tambah Baru
        </Link>
      </div>

      <BeritaTable data={semua} />
    </div>
  )
}