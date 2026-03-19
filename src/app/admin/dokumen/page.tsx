import type { Metadata } from 'next'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getDokumen, hapusDokumen } from '@/actions/dokumen'
import DeleteButton from '@/components/admin/DeleteButton'
import { formatTanggalIndonesia } from '@/lib/format'

export const metadata: Metadata = { title: 'Dokumen Admin' }

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

      <div className="bg-white rounded-2xl shadow-sm">
        {dokumen.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <i className="fas fa-file-alt text-5xl mb-4 block" style={{ color: '#c8972a' }} />
            <p className="text-lg font-medium text-gray-600 mb-1">Belum Ada Dokumen</p>
            <p className="text-sm">Tambahkan dokumen agar bisa diunduh dari website publik.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {dokumen.map((d) => (
              <div key={d.id} className="flex items-center gap-4 px-6 py-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: d.warnaBg }}>
                  <i className={`fas ${d.icon}`} style={{ color: d.warnaIcon }} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{d.nama}</p>
                  <p className="text-xs text-gray-400">{d.tipe} • {d.ukuran} • {formatTanggalIndonesia(d.tanggal)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/dokumen/edit/${d.id}`}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors"
                    title="Edit">
                    <i className="fas fa-pen text-blue-500 text-sm" />
                  </Link>
                  <form action={hapusDokumen.bind(null, d.id)}>
                    <DeleteButton
                      className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                      confirmMessage="Hapus dokumen ini?"
                      title="Hapus">
                      <i className="fas fa-trash text-red-400 text-sm" />
                    </DeleteButton>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
