import type { Metadata } from 'next'
import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/db'
import PpdbTable from '@/components/admin/PpdbTable'

export const metadata: Metadata = { title: 'Data PPDB' }

export default async function AdminPPDBPage() {
  await requireAdmin()
  const pendaftar = await prisma.pendaftarPPDB.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="space-y-6 pt-16 lg:pt-0">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#0f2557', fontFamily: 'var(--font-playfair),serif' }}>
          Data Pendaftar PPDB
        </h1>
        <p className="text-gray-500 text-sm mt-1">{pendaftar.length} pendaftar masuk</p>
      </div>

      {pendaftar.length === 0 ? (
        <div className="bg-white rounded-2xl py-20 text-center text-gray-400 shadow-sm">
          <i className="fas fa-user-graduate text-5xl mb-4 block" style={{ color: '#c8972a' }} />
          <p className="text-lg font-medium text-gray-600 mb-2">Belum Ada Pendaftar</p>
          <p className="text-sm">Data pendaftar dari form PPDB publik akan muncul di sini.</p>
        </div>
      ) : (
        <PpdbTable data={pendaftar} />
      )}
    </div>
  )
}