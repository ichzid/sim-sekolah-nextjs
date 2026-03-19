import type { Metadata } from 'next'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getBerita, hapusBerita } from '@/actions/berita'
import DeleteButton from '@/components/admin/DeleteButton'

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

      {/* Tabel */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {semua.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            <i className="fas fa-newspaper text-4xl mb-3 block" />
            <p>Belum ada berita. Tambahkan sekarang!</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-4">Judul</th>
                <th className="px-6 py-4 hidden md:table-cell">Tipe</th>
                <th className="px-6 py-4 hidden md:table-cell">Tanggal</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {semua.map((b) => (
                <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: '#0f2557' }}>
                        <i className={`fas ${b.icon ?? 'fa-newspaper'} text-white text-xs`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 line-clamp-1">{b.judul}</p>
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{b.ringkasan}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      b.tipe === 'pengumuman'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {b.tipe}
                    </span>
                    {b.prioritas && (
                      <span className="ml-2 px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600">
                        Penting
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{b.tanggal}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/berita/edit/${b.id}`}
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors"
                        title="Edit">
                        <i className="fas fa-pen text-blue-500 text-sm" />
                      </Link>
                      <form action={hapusBerita.bind(null, b.id)}>
                        <DeleteButton
                          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                          title="Hapus"
                          confirmMessage="Hapus berita ini?"
                        >
                          <i className="fas fa-trash text-red-400 text-sm" />
                        </DeleteButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
