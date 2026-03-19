import type { Metadata } from 'next'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getGuru, hapusGuru } from '@/actions/guru'
import DeleteButton from '@/components/admin/DeleteButton'

export const metadata: Metadata = { title: 'Kelola Guru & Staf' }

const ikonMap: Record<string, string> = {
  pimpinan: 'fa-user-tie',
  guru: 'fa-chalkboard-teacher',
  staf: 'fa-user-cog',
}

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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {semua.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-400 bg-white rounded-2xl">
            <i className="fas fa-users text-4xl mb-3 block" />
            <p>Belum ada data guru.</p>
          </div>
        )}
        {semua.map((g) => (
          <div key={g.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="h-28 flex items-center justify-center"
              style={{ background: g.warnaBg }}>
              <i className={`fas ${ikonMap[g.kategori] ?? 'fa-user'} text-white text-4xl`} />
            </div>
            <div className="p-4">
              <span className="text-xs font-bold px-2 py-0.5 rounded text-white"
                style={{ background: '#0f2557' }}>
                {g.jabatan}
              </span>
              <p className="font-semibold mt-2 text-sm" style={{ color: '#0f2557' }}>{g.nama}</p>
              <p className="text-xs text-gray-400 mt-0.5">{g.mapel}</p>
              <div className="flex items-center gap-2 mt-3">
                <Link href={`/admin/guru/edit/${g.id}`}
                  className="flex-1 py-1.5 rounded-lg text-xs font-medium text-center text-blue-500 border border-blue-200 hover:bg-blue-50 transition-colors">
                  <i className="fas fa-pen mr-1" /> Edit
                </Link>
                <form action={hapusGuru.bind(null, g.id)} className="flex-1">
                  <DeleteButton
                    className="w-full py-1.5 rounded-lg text-xs font-medium text-red-500 border border-red-200 hover:bg-red-50 transition-colors"
                    confirmMessage="Hapus data ini?">
                    <i className="fas fa-trash mr-1" /> Hapus
                  </DeleteButton>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
