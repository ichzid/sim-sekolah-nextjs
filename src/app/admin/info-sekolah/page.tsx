import type { Metadata } from 'next'
import { requireAdmin } from '@/lib/auth'
import { getInfoSekolah, updateInfoSekolah } from '@/actions/sekolah'
import { parseJsonArray } from '@/lib/info-sekolah'
import DynamicListInput from '@/components/admin/DynamicListInput'

export const metadata: Metadata = { title: 'Informasi Sekolah' }

function SectionCard({ icon, title, description, children }: {
  icon: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-start gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(15,37,87,0.08)' }}>
          <i className={`fas ${icon} text-sm`} style={{ color: '#0f2557' }} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
        </div>
      </div>
      {children}
    </div>
  )
}

function FieldInput({ label, name, defaultValue, placeholder, fullWidth, textarea, rows }: {
  label: React.ReactNode
  name: string
  defaultValue?: string
  placeholder?: string
  fullWidth?: boolean
  textarea?: boolean
  rows?: number
}) {
  const cls = 'w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] text-sm transition-colors'
  return (
    <div className={fullWidth ? 'md:col-span-2' : ''}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {textarea ? (
        <textarea name={name} rows={rows || 4} defaultValue={defaultValue ?? ''} placeholder={placeholder}
          className={`${cls} ${name === 'misi' ? 'resize-none font-mono' : name === 'sambutanKepalaSekolah' ? 'resize-y leading-7' : 'resize-none'}`} />
      ) : (
        <input type="text" name={name} defaultValue={defaultValue ?? ''} placeholder={placeholder} className={cls} />
      )}
    </div>
  )
}

export default async function InfoSekolahPage() {
  await requireAdmin()
  const info = await getInfoSekolah()
  const heroPreviewUrl = info?.heroBackgroundUrl?.trim() || '/hero-sekolah-dummy.svg'

  const misiArr = parseJsonArray<string>(info?.misi)
  const statistikArr = parseJsonArray<{ nilai: string; label: string }>(info?.statistikSekolah)
  const prestasiArr = parseJsonArray<{ icon: string; judul: string; keterangan: string }>(info?.prestasiSekolah)

  return (
    <div className="space-y-6 pt-16 lg:pt-0">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#0f2557', fontFamily: 'var(--font-playfair),serif' }}>
          Informasi Sekolah
        </h1>
        <p className="text-gray-500 text-sm mt-1">Perubahan akan langsung tampil di website publik</p>
      </div>

      <form action={updateInfoSekolah} className="space-y-6">

        {/* ─── Row 1: Identitas + Kontak ─── */}
        <div className="grid lg:grid-cols-2 gap-6">
          <SectionCard icon="fa-id-card" title="Identitas Sekolah" description="Data dasar dan identitas resmi sekolah">
            <div className="grid md:grid-cols-2 gap-4">
              <FieldInput label="Nama Lengkap Sekolah" name="nama" defaultValue={info?.nama ?? ''} placeholder="SD Muhammadiyah Danau Sijabut" fullWidth />
              <FieldInput label="Singkatan" name="singkatan" defaultValue={info?.singkatan ?? ''} placeholder="SD MuDaSi" />
              <FieldInput label="NPSN" name="npsn" defaultValue={info?.npsn ?? ''} placeholder="10202012" />
              <FieldInput label="Akreditasi" name="akreditasi" defaultValue={info?.akreditasi ?? ''} placeholder="A" />
              <FieldInput label="Tahun Berdiri" name="tahunBerdiri" defaultValue={info?.tahunBerdiri ?? ''} placeholder="1980" />
              <FieldInput label="Kepala Sekolah" name="kepalaSekolah" defaultValue={info?.kepalaSekolah ?? ''} placeholder="Nama Kepala, S.Pd." />
            </div>
          </SectionCard>

          <SectionCard icon="fa-map-marker-alt" title="Kontak & Alamat" description="Alamat, telepon, email, dan lokasi sekolah">
            <div className="grid md:grid-cols-2 gap-4">
              <FieldInput label="Alamat" name="alamat" defaultValue={info?.alamat ?? ''} placeholder="Jl. Pendidikan No. 1" fullWidth />
              <FieldInput label="Kota / Kabupaten" name="kota" defaultValue={info?.kota ?? ''} placeholder="Kabupaten Asahan" />
              <FieldInput label="Kode Pos" name="kodePos" defaultValue={info?.kodePos ?? ''} placeholder="21252" />
              <FieldInput label="Telepon" name="telepon" defaultValue={info?.telepon ?? ''} placeholder="(0623) 555-0001" />
              <FieldInput label="Email" name="email" defaultValue={info?.email ?? ''} placeholder="info@sekolah.sch.id" />
              <FieldInput label="Website" name="website" defaultValue={info?.website ?? ''} placeholder="www.sekolah.sch.id" />
              <FieldInput label="Jam Operasional" name="jamOperasional" defaultValue={info?.jamOperasional ?? ''} placeholder="Senin-Jumat: 07.00-15.00 WIB" fullWidth />
              <FieldInput label="Link Google Maps" name="googleMapsUrl" defaultValue={info?.googleMapsUrl ?? ''} placeholder="https://maps.google.com/?q=..." fullWidth />
            </div>
          </SectionCard>
        </div>

        {/* ─── Row 2: Media Sosial + Hero ─── */}
        <div className="grid lg:grid-cols-2 gap-6">
          <SectionCard icon="fa-share-alt" title="Media Sosial" description="Link ke akun media sosial sekolah">
            <div className="grid md:grid-cols-2 gap-4">
              <FieldInput label="Facebook" name="facebookUrl" defaultValue={info?.facebookUrl ?? ''} placeholder="https://facebook.com/nama-halaman" />
              <FieldInput label="Instagram" name="instagramUrl" defaultValue={info?.instagramUrl ?? ''} placeholder="https://instagram.com/nama-akun" />
              <FieldInput label="YouTube" name="youtubeUrl" defaultValue={info?.youtubeUrl ?? ''} placeholder="https://youtube.com/@channel" />
              <FieldInput label="WhatsApp" name="whatsappUrl" defaultValue={info?.whatsappUrl ?? ''} placeholder="https://wa.me/6281234567890" />
            </div>
          </SectionCard>

          <SectionCard icon="fa-image" title="Hero Halaman Depan" description="Gambar latar belakang bagian atas halaman utama">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">URL Gambar Background Hero</label>
                <input type="text" name="heroBackgroundUrl" defaultValue={info?.heroBackgroundUrl ?? ''}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] text-sm transition-colors" />
                <p className="text-xs text-gray-400 mt-2">
                  Kosongkan jika ingin memakai gambar dummy bawaan.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden border border-gray-100 min-h-44"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(10,26,78,0.78), rgba(15,37,87,0.74), rgba(26,58,128,0.68)), url('${heroPreviewUrl}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}>
                <div className="px-6 py-8 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/65 font-semibold">Preview Hero</p>
                  <h4 className="text-3xl font-black mt-3" style={{ fontFamily: 'var(--font-playfair),serif' }}>
                    {info?.nama || 'Nama Sekolah'}
                  </h4>
                  <p className="text-sm text-white/75 mt-3 max-w-md">
                    {info?.motto || 'Cerdas, Berakhlak, Berprestasi'}
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* ─── Row 3: Visi, Misi & Sambutan (full width) ─── */}
        <SectionCard icon="fa-bullseye" title="Visi, Misi & Sambutan" description="Informasi visi, misi, motto, dan sambutan kepala sekolah">
          <div className="space-y-4">
            <FieldInput label="Motto" name="motto" defaultValue={info?.motto ?? ''} placeholder="Cerdas, Berakhlak, Berprestasi" />
            <FieldInput label="Visi" name="visi" defaultValue={info?.visi ?? ''} placeholder="Pernyataan visi sekolah..." textarea rows={3} />
            <FieldInput
              label={<>Misi <span className="text-gray-400 font-normal">(satu baris per poin misi)</span></>}
              name="misi" defaultValue={misiArr.join('\n')} placeholder={'Misi pertama\nMisi kedua\nMisi ketiga'} textarea rows={6}
            />
            <FieldInput
              label={<>Sambutan Kepala Sekolah <span className="text-gray-400 font-normal">(pisahkan paragraf dengan baris kosong)</span></>}
              name="sambutanKepalaSekolah" defaultValue={info?.sambutanKepalaSekolah ?? ''}
              placeholder={'Paragraf pembuka sambutan...\n\nParagraf kedua sambutan...\n\nParagraf penutup sambutan...'} textarea rows={10}
            />
          </div>
        </SectionCard>

        {/* ─── Row 4: Statistik + Prestasi ─── */}
        <div className="grid lg:grid-cols-2 gap-6">
          <SectionCard icon="fa-chart-bar" title="Statistik Sekolah" description="Angka-angka pencapaian yang ditampilkan di halaman profil">
            <DynamicListInput
              name="statistikSekolah"
              items={statistikArr as unknown as Record<string, string>[]}
              addLabel="Tambah Statistik"
              emptyItem={{ nilai: '', label: '' }}
              fields={[
                { name: 'nilai', label: 'Nilai', placeholder: '45+' },
                { name: 'label', label: 'Label', placeholder: 'Tahun Berdiri' },
              ]}
            />
          </SectionCard>

          <SectionCard icon="fa-trophy" title="Prestasi Sekolah" description="Daftar prestasi yang ditampilkan di halaman profil">
            <DynamicListInput
              name="prestasiSekolah"
              items={prestasiArr as unknown as Record<string, string>[]}
              addLabel="Tambah Prestasi"
              emptyItem={{ icon: '', judul: '', keterangan: '' }}
              fields={[
                { name: 'icon', label: 'Ikon (Font Awesome)', placeholder: 'fa-trophy' },
                { name: 'judul', label: 'Judul Prestasi', placeholder: 'Juara 1 Olimpiade Matematika' },
                { name: 'keterangan', label: 'Keterangan', placeholder: 'Tingkat Kabupaten - 2024' },
              ]}
            />
            <p className="text-xs text-gray-400 mt-3">
              Ikon memakai nama Font Awesome, misalnya <code className="bg-gray-100 px-1 rounded">fa-trophy</code>, <code className="bg-gray-100 px-1 rounded">fa-medal</code>, atau <code className="bg-gray-100 px-1 rounded">fa-award</code>.
            </p>
          </SectionCard>
        </div>

        {/* Submit button */}
        <button type="submit"
          className="w-full py-3.5 rounded-xl font-semibold text-white text-sm"
          style={{ background: 'linear-gradient(135deg,#0f2557,#1a3a80)' }}>
          <i className="fas fa-save mr-2" /> Simpan Perubahan
        </button>
      </form>
    </div>
  )
}