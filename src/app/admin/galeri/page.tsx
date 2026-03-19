import type { Metadata } from 'next'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getGaleri, hapusGaleri } from '@/actions/galeri'
import DeleteButton from '@/components/admin/DeleteButton'

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

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {galeri.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl shadow-sm py-20 text-center text-gray-400">
            <i className="fas fa-images text-5xl mb-4 block" style={{ color: '#c8972a' }} />
            <p>Belum ada item galeri.</p>
          </div>
        )}
        {galeri.map((g) => (
          <div key={g.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="h-40 flex items-center justify-center" style={{ background: g.warnaBg }}>
              <i className={`fas ${g.icon} text-white text-5xl`} />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-sm" style={{ color: '#0f2557' }}>{g.judul}</p>
                  <p className="text-xs text-gray-400 mt-1 capitalize">{g.kategori} • {g.ukuran}</p>
                </div>
                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                  {g.kategori}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-3 line-clamp-2">{g.keterangan}</p>
              <div className="flex items-center gap-2 mt-4">
                <Link href={`/admin/galeri/edit/${g.id}`}
                  className="flex-1 py-2 rounded-lg text-xs font-medium text-center text-blue-500 border border-blue-200 hover:bg-blue-50 transition-colors">
                  <i className="fas fa-pen mr-1" /> Edit
                </Link>
                <form action={hapusGaleri.bind(null, g.id)} className="flex-1">
                  <DeleteButton
                    className="w-full py-2 rounded-lg text-xs font-medium text-red-500 border border-red-200 hover:bg-red-50 transition-colors"
                    confirmMessage="Hapus item galeri ini?">
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
