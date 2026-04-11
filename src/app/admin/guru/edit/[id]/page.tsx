import type { Metadata } from 'next'
import { requireAdmin } from '@/lib/auth'
import { updateGuru } from '@/actions/guru'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import AdminFormKembali from '@/components/admin/AdminFormKembali'

export const metadata: Metadata = { title: 'Edit Guru/Staf' }

export default async function EditGuruPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id: rawId } = await params
  const id = parseInt(rawId, 10)
  if (isNaN(id)) notFound()

  const guru = await prisma.guru.findUnique({ where: { id } })
  if (!guru) notFound()

  return (
    <div className="space-y-6 pt-16 lg:pt-0 max-w-2xl">
      <div>
        <AdminFormKembali href="/admin/guru" />
        <h1 className="text-2xl font-bold mt-3" style={{ color: '#0f2557', fontFamily: 'var(--font-playfair),serif' }}>
          Edit Guru / Staf
        </h1>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <form action={updateGuru.bind(null, id)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap + Gelar *</label>
            <input type="text" name="nama" required defaultValue={guru.nama}
              placeholder="Contoh: Ahmad S.Pd., M.Pd."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] text-sm transition-colors" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Jabatan *</label>
              <input type="text" name="jabatan" required defaultValue={guru.jabatan}
                placeholder="Contoh: Guru Kelas, Kepala Sekolah"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] text-sm transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori *</label>
              <select name="kategori" required defaultValue={guru.kategori}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] text-sm bg-white transition-colors">
                <option value="pimpinan">Pimpinan</option>
                <option value="guru">Guru Mapel / Kelas</option>
                <option value="staf">Tenaga Kependidikan</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mata Pelajaran</label>
              <input type="text" name="mapel" defaultValue={guru.mapel}
                placeholder="Contoh: Matematika, PGSD"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] text-sm transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Pendidikan</label>
              <input type="text" name="pendidikan" defaultValue={guru.pendidikan}
                placeholder="Contoh: S1 PGSD"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] text-sm transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Lama Pengalaman</label>
            <input type="text" name="pengalaman" defaultValue={guru.pengalaman}
              placeholder="Contoh: 8 tahun"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] text-sm transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Foto Guru (Opsional)</label>
            {guru.fotoUrl && (
              <div className="mb-3">
                <img src={guru.fotoUrl} alt="Foto saat ini" className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
                <p className="text-xs text-gray-500 mt-1">Biarkan kosong jika tidak ingin mengubah foto</p>
              </div>
            )}
            <input type="file" name="foto" accept="image/png, image/jpeg, image/jpg, image/webp"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] text-sm transition-colors bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#0f2557] file:text-white hover:file:bg-[#1a3a80] cursor-pointer" />
            <p className="text-[10px] text-gray-400 mt-1">Format: JPG, PNG, WEBP (Maks 2MB).</p>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit"
              className="flex-1 py-3 rounded-xl font-semibold text-white text-sm"
              style={{ background: '#0f2557' }}>
              <i className="fas fa-save mr-2" /> Simpan Perubahan
            </button>
            <AdminFormKembali href="/admin/guru" asButton />
          </div>
        </form>
      </div>
    </div>
  )
}
