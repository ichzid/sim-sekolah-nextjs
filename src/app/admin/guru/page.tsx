import type { Metadata } from 'next'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getGuru } from '@/actions/guru'
import GuruTable from '@/components/admin/GuruTable'

export const metadata: Metadata = { title: 'Kelola Guru & Staf' }

export default async function AdminGuruPage() {
  await requireAdmin()
  const semua = await getGuru()

  return (
    <div className="space-y-6 pt-16 lg:pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0f2557', fontFamily: 'var(--font-playfair),serif' }}>
            Guru & Tenaga Kependidikan
          </h1>
          <p className="text-gray-500 text-sm mt-1">{semua.length} orang terdaftar</p>
        </div>
        <Link href="/admin/guru/tambah"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm"
          style={{ background: '#0f2557' }}>
          <i className="fas fa-plus" /> Tambah
        </Link>
      </div>

      <GuruTable data={semua} />
    </div>
  )
}