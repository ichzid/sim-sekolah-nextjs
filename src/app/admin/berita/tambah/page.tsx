import type { Metadata } from 'next'
import { requireAdmin } from '@/lib/auth'
import { tambahBerita } from '@/actions/berita'
import AdminFormKembali from '@/components/admin/AdminFormKembali'

export const metadata: Metadata = { title: 'Tambah Berita' }

export default async function TambahBeritaPage() {
  await requireAdmin()

  return (
    <div className="space-y-6 pt-16 lg:pt-0 max-w-2xl">
      <div>
        <AdminFormKembali href="/admin/berita" />
        <h1 className="text-2xl font-bold mt-3" style={{ color: '#0f2557', fontFamily: 'var(--font-playfair),serif' }}>
          Tambah Berita / Pengumuman
        </h1>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <form action={tambahBerita} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul *</label>
            <input type="text" name="judul" required
              placeholder="Judul berita atau pengumuman"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] transition-colors text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Ringkasan *</label>
            <textarea name="ringkasan" required rows={3}
              placeholder="Ringkasan singkat (ditampilkan di halaman publik)"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] transition-colors text-sm resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Isi Lengkap</label>
            <textarea name="isi" rows={6}
              placeholder="Isi lengkap berita (opsional)"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] transition-colors text-sm resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori *</label>
              <input type="text" name="kategori" required
                placeholder="Contoh: Prestasi, PPDB, Akademik"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] transition-colors text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tipe *</label>
              <select name="tipe" required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] transition-colors text-sm bg-white">
                <option value="berita">Berita</option>
                <option value="pengumuman">Pengumuman</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal Publikasi *</label>
              <input type="date" name="tanggal" required defaultValue={new Date().toISOString().slice(0, 10)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] transition-colors text-sm" />
            </div>
            <div className="flex items-center gap-3 pt-7">
              <input type="checkbox" name="published" value="true" id="published" defaultChecked
                className="w-4 h-4 rounded" />
              <label htmlFor="published" className="text-sm text-gray-700">
                Tampilkan di website publik
              </label>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" name="prioritas" value="true" id="prioritas"
              className="w-4 h-4 rounded" />
            <label htmlFor="prioritas" className="text-sm text-gray-700">
              Tandai sebagai <strong>Penting / Prioritas</strong>
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit"
              className="flex-1 py-3 rounded-xl font-semibold text-white text-sm"
              style={{ background: '#0f2557' }}>
              <i className="fas fa-save mr-2" /> Simpan
            </button>
            <AdminFormKembali href="/admin/berita" asButton />
          </div>
        </form>
      </div>
    </div>
  )
}
