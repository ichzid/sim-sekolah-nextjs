import type { Metadata } from 'next'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getGaleri } from '@/actions/galeri'
import GaleriTable from '@/components/admin/GaleriTable'

export const metadata: Metadata = { title: 'Galeri Admin' }

export default async function AdminGaleriPage() {
  await requireAdmin()
  const galeri = await getGaleri()

  return (
    <div className="space-y-6 pt-16 lg:pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0f2557', fontFamily: 'var(--font-playfair),serif' }}>
            Galeri Foto
          </h1>
          <p className="text-gray-500 text-sm mt-1">{galeri.length} item galeri</p>
        </div>
        <Link href="/admin/galeri/tambah"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm"
          style={{ background: '#0f2557' }}>
          <i className="fas fa-plus" /> Tambah
        </Link>
      </div>

      <GaleriTable data={galeri} />
    </div>
  )
}