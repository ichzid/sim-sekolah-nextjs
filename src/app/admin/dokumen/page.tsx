import type { Metadata } from 'next'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getDokumen } from '@/actions/dokumen'
import DokumenTable from '@/components/admin/DokumenTable'

export const metadata: Metadata = { title: 'Dokumen Unduhan' }

export default async function AdminDokumenPage() {
  await requireAdmin()
  const dokumen = await getDokumen()

  return (
    <div className="space-y-6 pt-16 lg:pt-0">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0f2557', fontFamily: 'var(--font-playfair),serif' }}>
            Dokumen Unduhan
          </h1>
          <p className="text-gray-500 text-sm mt-1">{dokumen.length} dokumen tersimpan</p>
        </div>
        <Link href="/admin/dokumen/tambah"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm"
          style={{ background: '#0f2557' }}>
          <i className="fas fa-plus" /> Tambah
        </Link>
      </div>

      <DokumenTable data={dokumen} />
    </div>
  )
}