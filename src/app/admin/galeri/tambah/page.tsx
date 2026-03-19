import type { Metadata } from 'next'
import { requireAdmin } from '@/lib/auth'
import { tambahGaleri } from '@/actions/galeri'
import AdminFormKembali from '@/components/admin/AdminFormKembali'

export const metadata: Metadata = { title: 'Tambah Galeri' }

export default async function TambahGaleriPage() {
  await requireAdmin()

  return (
    <div className="space-y-6 pt-16 lg:pt-0 max-w-2xl">
      <div>
        <AdminFormKembali href="/admin/galeri" />
        <h1 className="text-2xl font-bold mt-3" style={{ color: '#0f2557', fontFamily: 'var(--font-playfair),serif' }}>
          Tambah Item Galeri
        </h1>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <form action={tambahGaleri} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul *</label>
            <input type="text" name="judul" required
              placeholder="Contoh: Kegiatan Market Day Kelas 5"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] transition-colors text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Keterangan</label>
            <textarea name="keterangan" rows={4}
              placeholder="Deskripsi singkat kegiatan"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] transition-colors text-sm resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori *</label>
              <select name="kategori" required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] transition-colors text-sm bg-white">
                <option value="akademik">Akademik</option>
                <option value="ekskul">Ekstrakurikuler</option>
                <option value="event">Event</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Ukuran *</label>
              <select name="ukuran" required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] transition-colors text-sm bg-white">
                <option value="normal">Normal</option>
                <option value="lebar">Lebar</option>
                <option value="besar">Besar</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Icon Font Awesome</label>
              <input type="text" name="icon"
                placeholder="Contoh: fa-book-open"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] transition-colors text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Warna / Gradient</label>
              <input type="text" name="warnaBg"
                placeholder="Contoh: linear-gradient(135deg,#0f2557,#1d4ed8)"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] transition-colors text-sm" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit"
              className="flex-1 py-3 rounded-xl font-semibold text-white text-sm"
              style={{ background: '#0f2557' }}>
              <i className="fas fa-save mr-2" /> Simpan
            </button>
            <AdminFormKembali href="/admin/galeri" asButton />
          </div>
        </form>
      </div>
    </div>
  )
}
