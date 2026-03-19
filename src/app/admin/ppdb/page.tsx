import type { Metadata } from 'next'
import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { updateStatusPpdb } from '@/actions/ppdb'

export const metadata: Metadata = { title: 'Data PPDB' }

const statusColor: Record<string, string> = {
  pending: '#d97706',
  diterima: '#16a34a',
  ditolak: '#dc2626',
}

export default async function AdminPPDBPage() {
  await requireAdmin()
  const pendaftar = await prisma.pendaftarPPDB.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="space-y-6 pt-16 lg:pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0f2557', fontFamily: 'var(--font-playfair),serif' }}>
            Data Pendaftar PPDB
          </h1>
          <p className="text-gray-500 text-sm mt-1">{pendaftar.length} pendaftar masuk</p>
        </div>
      </div>

      {pendaftar.length === 0 ? (
        <div className="bg-white rounded-2xl py-20 text-center text-gray-400 shadow-sm">
          <i className="fas fa-user-graduate text-5xl mb-4 block" style={{ color: '#c8972a' }} />
          <p className="text-lg font-medium text-gray-600 mb-2">Belum Ada Pendaftar</p>
          <p className="text-sm">Data pendaftar dari form PPDB publik akan muncul di sini.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="px-6 py-4">Nama</th>
                  <th className="px-6 py-4">Orang Tua</th>
                  <th className="px-6 py-4">Telepon</th>
                  <th className="px-6 py-4">Jalur</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {pendaftar.map((p) => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{p.namaLengkap}</p>
                      {p.asalSekolah && <p className="text-xs text-gray-400">{p.asalSekolah}</p>}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{p.namaOrtu}</td>
                    <td className="px-6 py-4 text-gray-600">{p.teleponOrtu}</td>
                    <td className="px-6 py-4">
                      <span className="capitalize px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        {p.jalur}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <form action={updateStatusPpdb.bind(null, p.id)} className="flex items-center gap-2">
                        <select name="status" defaultValue={p.status}
                          className="px-2 py-1 rounded border text-xs font-semibold outline-none focus:border-[#0f2557]"
                          style={{
                            background: (statusColor[p.status] || '#6b7280') + '10',
                            borderColor: (statusColor[p.status] || '#6b7280') + '40',
                            color: statusColor[p.status] ?? '#6b7280',
                          }}>
                          <option value="pending">Pending</option>
                          <option value="diterima">Diterima</option>
                          <option value="ditolak">Ditolak</option>
                        </select>
                        <button type="submit"
                          className="w-6 h-6 rounded flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                          title="Simpan Status">
                          <i className="fas fa-check text-xs" />
                        </button>
                      </form>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">
                      {new Date(p.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
