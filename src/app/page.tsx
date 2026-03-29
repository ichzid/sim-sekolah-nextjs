import Link from 'next/link'
import { prisma } from '@/lib/db'
import { formatTanggalIndonesia } from '@/lib/format'

export default async function HomePage() {
  const info = await prisma.infoSekolah.findFirst()
  const infoSekolah = info || {
    nama: 'SD Muhammadiyah Danau Sijabut',
    akreditasi: 'A',
    motto: 'Cerdas, Berakhlak, Berprestasi',
    heroBackgroundUrl: '/hero-sekolah-dummy.svg',
  }
  const heroImageUrl = infoSekolah.heroBackgroundUrl?.trim() || '/hero-sekolah-dummy.svg'
  const heroBackground = `linear-gradient(135deg, rgba(10,26,78,0.8) 0%, rgba(15,37,87,0.72) 40%, rgba(26,58,128,0.6) 100%), url('${heroImageUrl}')`

  const dataBerita = await prisma.berita.findMany({
    where: { tipe: 'berita', published: true, slug: { not: null } },
    orderBy: { createdAt: 'desc' },
    take: 3
  })

  const dataPengumuman = await prisma.berita.findMany({
    where: { tipe: 'pengumuman', published: true, slug: { not: null } },
    orderBy: { createdAt: 'desc' },
    take: 3
  })

  const dataGuru = await prisma.guru.findMany({
    where: { aktif: true },
    orderBy: { id: 'asc' },
    take: 4
  })

  return (
    <>
      {/* ===== HERO ===== */}
      <section
        className="hero-bg min-h-screen flex items-center relative"
        style={
          {
            backgroundImage: heroBackground,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }
        }
      >
        <div
          className="hero-orb w-96 h-96 opacity-30"
          style={{ top: '40px', right: '80px' }}
        />
        <div
          className="hero-orb w-72 h-72 opacity-20"
          style={{ bottom: '80px', left: '40px' }}
        />

        <div className="max-w-7xl mx-auto px-4 py-32 grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="text-white">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 border border-yellow-400/40"
              style={{ background: 'rgba(200,151,42,0.15)', color: '#e6b84a' }}
            >
              <i className="fas fa-award" /> Terakreditasi {infoSekolah.akreditasi} –{' '}
              Kemendikbud RI
            </div>
            <h1
              className="text-5xl lg:text-6xl font-black leading-tight mb-6"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              {infoSekolah.nama
                .split(' ')
                .slice(0, 2)
                .join(' ')}
              <br />
              <span style={{ color: '#e6b84a' }}>
                {infoSekolah.nama.split(' ').slice(2).join(' ')}
              </span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
              {infoSekolah.motto}. Membentuk generasi beriman, berilmu, dan
              berakhlak mulia berdasarkan nilai-nilai Islam dan Muhammadiyah.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/ppdb"
                className="px-8 py-3 rounded-full font-semibold text-white transition-all hover:scale-105"
                style={{
                  background:
                    'linear-gradient(135deg,#c8972a,#e6b84a)',
                }}
              >
                Daftar Sekarang <i className="fas fa-arrow-right ml-2" />
              </Link>
              <Link
                href="/profil"
                className="px-8 py-3 rounded-full font-semibold border border-white/40 text-white hover:bg-white/10 transition-all"
              >
                Pelajari Lebih
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs flex flex-col items-center gap-2 animate-bounce">
          <span>Gulir ke bawah</span>
          <i className="fas fa-chevron-down" />
        </div>
      </section>

      <div className="gold-line" />

      {/* ===== BERITA TERBARU (Preview) ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="section-badge text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                Informasi Terkini
              </span>
              <h2
                className="text-4xl font-black mt-4"
                style={{
                  color: '#0f2557',
                  fontFamily: 'var(--font-playfair), serif',
                }}
              >
                Berita & Pengumuman
              </h2>
            </div>
            <Link
              href="/berita"
              className="text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-all"
              style={{ color: '#0f2557' }}
            >
              Lihat Semua <i className="fas fa-arrow-right text-xs" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {dataBerita.map((b) => (
              <Link
                key={b.id}
                href={`/berita/${b.slug}`}
                className="card-hover rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
              >
                <div
                  className="h-48 flex items-center justify-center"
                  style={{ background: b.warnaBg ?? 'linear-gradient(135deg,#0f2557,#2a5298)' }}
                >
                  <i
                    className={`fas ${b.icon ?? 'fa-newspaper'} text-white text-5xl opacity-40`}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="news-tag px-2 py-1 rounded font-bold text-xs uppercase tracking-wider">
                      {b.kategori}
                    </span>
                    <span className="text-xs text-gray-400">
                      <i className="fas fa-calendar mr-1" />
                      {formatTanggalIndonesia(b.tanggal)}
                    </span>
                  </div>
                  <h4
                    className="font-bold text-lg mb-2"
                    style={{ color: '#0f2557' }}
                  >
                    {b.judul}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {b.ringkasan}
                  </p>
                  <span
                    className="inline-flex items-center gap-2 mt-4 text-sm font-semibold"
                    style={{ color: '#0f2557' }}
                  >
                    Baca Selengkapnya{' '}
                    <i className="fas fa-arrow-right text-xs" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PENGUMUMAN TERBARU ===== */}
      <section className="py-16" style={{ background: '#fdf8f0' }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3
              className="text-2xl font-bold"
              style={{
                color: '#0f2557',
                fontFamily: 'var(--font-playfair), serif',
              }}
            >
              Pengumuman Terbaru
            </h3>
            <Link
              href="/berita"
              className="text-sm font-semibold"
              style={{ color: '#0f2557' }}
            >
              Lihat Semua
            </Link>
          </div>
          <div className="space-y-4">
            {dataPengumuman.map((p) => (
              <Link
                key={p.id}
                href={`/berita/${p.slug}`}
                className="flex items-start gap-4 p-5 rounded-r-xl border-l-4"
                style={{
                  borderColor: p.warnaKiri ?? '#0f2557',
                  background:
                    (p.warnaKiri ?? '#0f2557') === '#0f2557'
                      ? '#eff6ff'
                      : (p.warnaKiri ?? '#0f2557') === '#c8972a'
                      ? '#fefbeb'
                      : '#f0fdf4',
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: p.warnaKiri ?? '#0f2557' }}
                >
                  <i className="fas fa-bullhorn text-white text-sm" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold" style={{ color: '#0f2557' }}>
                      {p.judul}
                    </h4>
                    {p.prioritas && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-semibold">
                        Penting
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{p.ringkasan}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    <i className="fas fa-calendar mr-1" />
                    {formatTanggalIndonesia(p.tanggal)}
                  </p>
                  <span className="inline-flex items-center gap-2 mt-3 text-sm font-semibold" style={{ color: '#0f2557' }}>
                    Lihat Detail <i className="fas fa-arrow-right text-xs" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GURU UNGGULAN (Preview) ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="section-badge text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
              Sumber Daya Manusia
            </span>
            <h2
              className="text-4xl font-black mt-4 mb-3"
              style={{
                color: '#0f2557',
                fontFamily: 'var(--font-playfair), serif',
              }}
            >
              Guru & Tenaga Kependidikan
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Tim profesional berpengalaman yang berdedikasi membimbing setiap
              siswa.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataGuru.map((g) => (
              <div
                key={g.id}
                className="card-hover bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <div
                  className="h-40 flex items-center justify-center"
                  style={{ background: g.warnaBg }}
                >
                  <i
                    className={`fas ${
                      g.kategori === 'pimpinan'
                        ? 'fa-user-tie'
                        : g.kategori === 'guru'
                        ? 'fa-chalkboard-teacher'
                        : 'fa-user-cog'
                    } text-white text-5xl`}
                  />
                </div>
                <div className="p-5">
                  <span
                    className="text-xs font-bold px-2 py-1 rounded text-white"
                    style={{ background: g.warnaBg.includes('0f2557') ? '#0f2557' : '#1a6b4a' }}
                  >
                    {g.jabatan}
                  </span>
                  <h4
                    className="font-bold mt-2"
                    style={{ color: '#0f2557' }}
                  >
                    {g.nama}
                  </h4>
                  <p className="text-sm text-gray-400">{g.mapel}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    <i className="fas fa-clock mr-1" />
                    {g.pengalaman} pengalaman
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/guru-staf"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white"
              style={{ background: '#0f2557' }}
            >
              Lihat Semua Guru & Staf{' '}
              <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PPDB CTA ===== */}
      <section
        className="py-20"
        style={{ background: 'linear-gradient(135deg,#0f2557,#1a3a80)' }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
            style={{
              background: 'rgba(200,151,42,0.25)',
              color: '#e6b84a',
            }}
          >
            <i className="fas fa-fire mr-2" />
            Pendaftaran Sedang Dibuka!
          </div>
          <h2
            className="text-4xl font-black text-white mb-4"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            PPDB Tahun Ajaran 2025/2026
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Daftarkan putra-putri Anda sekarang dan jadilah bagian dari
            keluarga besar {infoSekolah.nama}.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/ppdb"
              className="px-8 py-4 rounded-xl font-bold text-white text-lg transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg,#c8972a,#e6b84a)',
              }}
            >
              <i className="fas fa-pen-to-square mr-2" />
              Daftar Sekarang
            </Link>
            <Link
              href="/unduhan"
              className="px-8 py-4 rounded-xl font-bold border border-white/40 text-white hover:bg-white/10 transition-all"
            >
              <i className="fas fa-download mr-2" />
              Unduh Formulir
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
