import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { updateDokumen } from '@/actions/dokumen'
import { prisma } from '@/lib/db'
import AdminFormKembali from '@/components/admin/AdminFormKembali'
import { toDateInputValue } from '@/lib/format'

export const metadata: Metadata = { title: 'Edit Dokumen' }

export default async function EditDokumenPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id: rawId } = await params
  const id = parseInt(rawId, 10)
  if (isNaN(id)) notFound()

  const dokumen = await prisma.dokumen.findUnique({ where: { id } })
  if (!dokumen) notFound()

  return (
    <div className="space-y-6 pt-16 lg:pt-0 max-w-2xl">
      <div>
        <AdminFormKembali href="/admin/dokumen" />
        <h1 className="text-2xl font-bold mt-3" style={{ color: '#0f2557', fontFamily: 'var(--font-playfair),serif' }}>
          Edit Dokumen
        </h1>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <form action={updateDokumen.bind(null, id)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Dokumen *</label>
            <input type="text" name="nama" required defaultValue={dokumen.nama}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] transition-colors text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tipe File *</label>
              <select name="tipe" required defaultValue={dokumen.tipe}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] transition-colors text-sm bg-white">
                <option value="PDF">PDF</option>
                <option value="DOCX">DOCX</option>
                <option value="XLSX">XLSX</option>
                <option value="TXT">TXT</option>
                <option value="ZIP">ZIP</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Ukuran File *</label>
              <input type="text" name="ukuran" required defaultValue={dokumen.ukuran}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] transition-colors text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal *</label>
              <input type="date" name="tanggal" required defaultValue={toDateInputValue(dokumen.tanggal)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] transition-colors text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Keyword Pencarian</label>
              <input type="text" name="keyword" defaultValue={dokumen.keyword}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] transition-colors text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">URL Dokumen</label>
            <input type="text" name="url" defaultValue={dokumen.url}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] transition-colors text-sm" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit"
              className="flex-1 py-3 rounded-xl font-semibold text-white text-sm"
              style={{ background: '#0f2557' }}>
              <i className="fas fa-save mr-2" /> Simpan Perubahan
            </button>
            <AdminFormKembali href="/admin/dokumen" asButton />
          </div>
        </form>
      </div>
    </div>
  )
}
