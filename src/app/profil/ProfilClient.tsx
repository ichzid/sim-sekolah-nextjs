'use client'

import { useState } from 'react'

type Tab = 'sejarah' | 'visi' | 'sambutan' | 'prestasi'

export default function ProfilClient({
  infoSekolah,
  kepalaSekolah,
  prestasiSekolah,
}: {
  infoSekolah: any
  kepalaSekolah: {
    nama: string
    jabatan: string
    pendidikan: string
    pengalaman: string
  }
  prestasiSekolah: {
    icon: string
    judul: string
    keterangan: string
  }[]
}) {
  const [tab, setTab] = useState<Tab>('sejarah')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'sejarah', label: 'Sejarah' },
    { id: 'visi', label: 'Visi & Misi' },
    { id: 'sambutan', label: 'Sambutan Kepala Sekolah' },
    { id: 'prestasi', label: 'Prestasi' },
  ]

  const misiArr = infoSekolah.misi ? JSON.parse(infoSekolah.misi) : []
  const sambutanParagraf = (
    infoSekolah.sambutanKepalaSekolah ||
    `Puji syukur ke hadirat Allah SWT atas segala limpahan rahmat dan karunia-Nya, sehingga ${infoSekolah.nama} dapat terus berkarya dan berprestasi dalam dunia pendidikan Indonesia.

Sebagai ${kepalaSekolah.jabatan.toLowerCase()}, saya senantiasa berkomitmen untuk memberikan yang terbaik bagi seluruh warga sekolah, yaitu siswa, guru, dan tenaga kependidikan, dalam menciptakan iklim belajar yang positif, inklusif, dan berpusat pada murid.

Kami percaya bahwa setiap siswa memiliki potensi yang unik dan berharga. Tugas kami adalah memfasilitasi, membimbing, dan menginspirasi mereka untuk menemukan versi terbaik dirinya, bukan hanya dalam prestasi akademik, tetapi juga dalam pembentukan karakter yang kokoh.

Kami juga mengundang seluruh pemangku kepentingan, mulai dari orang tua, masyarakat, hingga mitra pendidikan, untuk bersama-sama membangun ekosistem pendidikan yang kuat demi masa depan generasi yang lebih cerah.`
  )
    .split(/\n\s*\n/)
    .map((item: string) => item.trim())
    .filter(Boolean)

  return (
    <>
      <div className="pt-24 pb-12 text-center" style={{ background: 'linear-gradient(135deg,#0f2557,#1a3a80)' }}>
        <h1 className="text-4xl font-black text-white mt-4" style={{ fontFamily: 'var(--font-playfair),serif' }}>
          Profil Sekolah
        </h1>
        <p className="text-white/60 mt-2">{infoSekolah.nama}</p>
      </div>
      <div className="gold-line" />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`cursor-pointer px-6 py-2 rounded-full border text-sm font-medium transition-all ${
                  tab === t.id ? 'tab-btn active bg-[#0f2557] text-white border-[#0f2557]' : 'border-gray-200 hover:border-gray-400'
                }`}
                style={tab === t.id ? { background: '#0f2557', color: 'white', borderColor: '#0f2557' } : {}}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'sejarah' && (
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4" style={{ color: '#0f2557', fontFamily: 'var(--font-playfair),serif' }}>
                  Berdiri Sejak {infoSekolah.tahunBerdiri}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {infoSekolah.nama} didirikan sebagai wujud nyata komitmen di bidang pendidikan.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="timeline-dot mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800">{infoSekolah.tahunBerdiri} – Pendirian</p>
                      <p className="text-sm text-gray-500">Berdiri atas prakarsa pendiri</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#0f2557,#1a3a80)', height: '380px' }}>
                <div className="text-center text-white p-8">
                  <i className="fas fa-school text-7xl mb-4" style={{ color: '#e6b84a' }} />
                  <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-playfair),serif' }}>
                    {infoSekolah.nama}
                  </p>
                  <p className="text-white/60 mt-2">Est. {infoSekolah.tahunBerdiri}</p>
                </div>
              </div>
            </div>
          )}

          {tab === 'visi' && (
            <div>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="rounded-2xl p-8 text-white" style={{ background: 'linear-gradient(135deg,#0f2557,#1a3a80)' }}>
                  <h3 className="text-2xl font-bold mb-4">Visi</h3>
                  <p className="text-white/80 leading-relaxed text-lg italic">{infoSekolah.visi}</p>
                </div>
                <div className="rounded-2xl p-8 border-2" style={{ borderColor: '#0f2557' }}>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#0f2557' }}>Misi</h3>
                  <ul className="space-y-3">
                    {misiArr.map((m: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <i className="fas fa-check-circle mt-1 text-sm" style={{ color: '#c8972a' }} />
                        <span className="text-gray-600">{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {tab === 'sambutan' && (
            <div className="grid lg:grid-cols-[280px_minmax(0,1fr)] gap-10 items-start">
              <div className="text-center">
                <div
                  className="w-52 h-52 rounded-full mx-auto border-4 flex items-center justify-center shadow-sm"
                  style={{
                    background: 'linear-gradient(135deg,#1e3a78,#0f2557)',
                    borderColor: '#c8972a',
                  }}
                >
                  <i className="fas fa-user text-white text-7xl" />
                </div>
                <h3
                  className="text-3xl font-bold mt-6 leading-tight"
                  style={{ color: '#0f2557', fontFamily: 'var(--font-playfair),serif' }}
                >
                  {kepalaSekolah.nama}
                </h3>
                <p className="text-lg text-gray-600 mt-2">{kepalaSekolah.jabatan}</p>
                <p className="text-base text-gray-400 mt-1">{infoSekolah.nama}</p>
                <div className="flex flex-wrap gap-3 justify-center mt-6">
                  <span
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{ color: '#2563eb', background: '#eff6ff', border: '1px solid #bfdbfe' }}
                  >
                    {kepalaSekolah.pendidikan}
                  </span>
                  <span
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{ color: '#b45309', background: '#fffbeb', border: '1px solid #fcd34d' }}
                  >
                    {kepalaSekolah.pengalaman} Pengalaman
                  </span>
                </div>
              </div>

              <div>
                <h3
                  className="text-4xl font-bold mb-6"
                  style={{ color: '#0f2557', fontFamily: 'var(--font-playfair),serif' }}
                >
                  Assalamu&apos;alaikum Wr. Wb.
                </h3>

                <div className="space-y-6 text-lg leading-relaxed text-gray-600">
                  {sambutanParagraf.map((paragraph: string, index: number) => (
                    <p key={`sambutan-${index}`}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-xl font-semibold" style={{ color: '#0f2557', fontFamily: 'var(--font-playfair),serif' }}>
                    Wassalamu&apos;alaikum Wr. Wb.
                  </p>
                  <p className="text-lg text-gray-500 mt-2">{kepalaSekolah.nama}</p>
                </div>
              </div>
            </div>
          )}

          {tab === 'prestasi' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prestasiSekolah.map((p, i) => (
                <div key={i} className="card-hover rounded-2xl p-6 text-center border border-yellow-200"
                  style={{ background: 'linear-gradient(135deg,#fffbeb,#fef9ec)' }}>
                  <i className={`fas ${p.icon} text-4xl mb-3`} style={{ color: '#c8972a' }} />
                  <h4 className="font-bold" style={{ color: '#0f2557' }}>{p.judul}</h4>
                  <p className="text-sm text-gray-500 mt-1">{p.keterangan}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
