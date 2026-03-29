import type { Metadata } from 'next'
import { requireAdmin } from '@/lib/auth'
import { getInfoSekolah, updateInfoSekolah } from '@/actions/sekolah'
import { parseJsonArray, stringifyPrestasiTextarea, stringifyStatistikTextarea } from '@/lib/info-sekolah'

export const metadata: Metadata = { title: 'Info Sekolah' }

export default async function InfoSekolahPage() {
  await requireAdmin()
  const info = await getInfoSekolah()
  const heroPreviewUrl = info?.heroBackgroundUrl?.trim() || '/hero-sekolah-dummy.svg'

  const misiArr = parseJsonArray<string>(info?.misi)
  const statistikArr = parseJsonArray<{ nilai: string; label: string }>(info?.statistikSekolah)
  const prestasiArr = parseJsonArray<{ icon: string; judul: string; keterangan: string }>(info?.prestasiSekolah)

  return (
    <div className="space-y-6 pt-16 lg:pt-0 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#0f2557', fontFamily: 'var(--font-playfair),serif' }}>
          Info Sekolah
        </h1>
        <p className="text-gray-500 text-sm mt-1">Perubahan akan langsung tampil di website publik</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <form action={updateInfoSekolah} className="space-y-6">
          {/* Identitas */}
          <div>
            <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-4">Identitas Sekolah</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: 'Nama Lengkap Sekolah', name: 'nama', val: info?.nama, ph: 'SD Muhammadiyah Danau Sijabut', full: true },
                { label: 'Singkatan', name: 'singkatan', val: info?.singkatan, ph: 'SD MuDaSi' },
                { label: 'NPSN', name: 'npsn', val: info?.npsn, ph: '10202012' },
                { label: 'Akreditasi', name: 'akreditasi', val: info?.akreditasi, ph: 'A' },
                { label: 'Tahun Berdiri', name: 'tahunBerdiri', val: info?.tahunBerdiri, ph: '1980' },
                { label: 'Kepala Sekolah', name: 'kepalaSekolah', val: info?.kepalaSekolah, ph: 'Nama Kepala, S.Pd.' },
              ].map((f) => (
                <div key={f.name} className={f.full ? 'md:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                  <input type="text" name={f.name} defaultValue={f.val ?? ''} placeholder={f.ph}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] text-sm transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Kontak */}
          <div>
            <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-4">Kontak & Lokasi</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: 'Alamat', name: 'alamat', val: info?.alamat, ph: 'Jl. Pendidikan No. 1', full: true },
                { label: 'Kota / Kabupaten', name: 'kota', val: info?.kota, ph: 'Kabupaten Asahan' },
                { label: 'Kode Pos', name: 'kodePos', val: info?.kodePos, ph: '21252' },
                { label: 'Telepon', name: 'telepon', val: info?.telepon, ph: '(0623) 555-0001' },
                { label: 'Email', name: 'email', val: info?.email, ph: 'info@sekolah.sch.id' },
                { label: 'Website', name: 'website', val: info?.website, ph: 'www.sekolah.sch.id' },
                { label: 'Jam Operasional', name: 'jamOperasional', val: info?.jamOperasional, ph: 'Senin-Jumat: 07.00-15.00 WIB', full: true },
                { label: 'Link Google Maps', name: 'googleMapsUrl', val: info?.googleMapsUrl, ph: 'https://maps.google.com/?q=...' , full: true },
                { label: 'Facebook', name: 'facebookUrl', val: info?.facebookUrl, ph: 'https://facebook.com/nama-halaman' },
                { label: 'Instagram', name: 'instagramUrl', val: info?.instagramUrl, ph: 'https://instagram.com/nama-akun' },
                { label: 'YouTube', name: 'youtubeUrl', val: info?.youtubeUrl, ph: 'https://youtube.com/@channel' },
                { label: 'WhatsApp', name: 'whatsappUrl', val: info?.whatsappUrl, ph: 'https://wa.me/6281234567890' },
              ].map((f) => (
                <div key={f.name} className={f.full ? 'md:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                  <input type="text" name={f.name} defaultValue={f.val ?? ''} placeholder={f.ph}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] text-sm transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          <div>
            <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-4">Hero Halaman Depan</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  URL Gambar Background Hero
                </label>
                <input
                  type="text"
                  name="heroBackgroundUrl"
                  defaultValue={info?.heroBackgroundUrl ?? ''}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] text-sm transition-colors"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Kosongkan jika ingin memakai gambar dummy bawaan. Gunakan link gambar langsung agar tampil stabil.
                </p>
              </div>
              <div
                className="rounded-2xl overflow-hidden border border-gray-100 min-h-44"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(10,26,78,0.78), rgba(15,37,87,0.74), rgba(26,58,128,0.68)), url('${heroPreviewUrl}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="px-6 py-8 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/65 font-semibold">Preview Hero</p>
                  <h4
                    className="text-3xl font-black mt-3"
                    style={{ fontFamily: 'var(--font-playfair),serif' }}
                  >
                    {info?.nama || 'Nama Sekolah'}
                  </h4>
                  <p className="text-sm text-white/75 mt-3 max-w-md">
                    {info?.motto || 'Cerdas, Berakhlak, Berprestasi'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Visi Misi */}
          <div>
            <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-4">Visi, Misi, Motto & Sambutan</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Motto</label>
                <input type="text" name="motto" defaultValue={info?.motto ?? ''}
                  placeholder="Cerdas, Berakhlak, Berprestasi"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] text-sm transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Visi</label>
                <textarea name="visi" rows={3} defaultValue={info?.visi ?? ''}
                  placeholder="Pernyataan visi sekolah..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] text-sm resize-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Misi <span className="text-gray-400 font-normal">(satu baris per poin misi)</span>
                </label>
                <textarea name="misi" rows={6} defaultValue={misiArr.join('\n')}
                  placeholder={'Misi pertama\nMisi kedua\nMisi ketiga'}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] text-sm resize-none transition-colors font-mono" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Sambutan Kepala Sekolah <span className="text-gray-400 font-normal">(pisahkan paragraf dengan baris kosong)</span>
                </label>
                <textarea
                  name="sambutanKepalaSekolah"
                  rows={10}
                  defaultValue={info?.sambutanKepalaSekolah ?? ''}
                  placeholder={'Paragraf pembuka sambutan...\n\nParagraf kedua sambutan...\n\nParagraf penutup sambutan...'}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] text-sm resize-y transition-colors leading-7"
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div>
            <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-4">Statistik & Prestasi</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Statistik Sekolah <span className="text-gray-400 font-normal">(format: nilai | label, satu baris per item)</span>
                </label>
                <textarea
                  name="statistikSekolah"
                  rows={6}
                  defaultValue={stringifyStatistikTextarea(statistikArr)}
                  placeholder={'45+ | Tahun Berdiri\n400+ | Siswa Aktif\n97% | Kelulusan\n30+ | Tenaga Pengajar'}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] text-sm resize-y transition-colors font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Prestasi Sekolah <span className="text-gray-400 font-normal">(format: icon | judul | keterangan)</span>
                </label>
                <textarea
                  name="prestasiSekolah"
                  rows={8}
                  defaultValue={stringifyPrestasiTextarea(prestasiArr)}
                  placeholder={'fa-trophy | Juara 1 Olimpiade Matematika | Tingkat Kabupaten - 2024\nfa-medal | Juara 2 O2SN Pencak Silat | Tingkat Provinsi - 2023'}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] text-sm resize-y transition-colors font-mono"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Ikon memakai nama Font Awesome, misalnya <code>fa-trophy</code>, <code>fa-medal</code>, atau <code>fa-award</code>.
                </p>
              </div>
            </div>
          </div>

          <button type="submit"
            className="w-full py-3.5 rounded-xl font-semibold text-white text-sm"
            style={{ background: 'linear-gradient(135deg,#0f2557,#1a3a80)' }}>
            <i className="fas fa-save mr-2" /> Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  )
}
