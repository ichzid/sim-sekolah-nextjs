'use client'

import Link from 'next/link'
import { useState } from 'react'
import { formatTanggalIndonesia } from '@/lib/format'

type Tipe = 'berita' | 'pengumuman'

export default function BeritaClient({
  dataBerita,
  dataPengumuman,
  infoSekolah,
}: {
  dataBerita: any[]
  dataPengumuman: any[]
  infoSekolah: any
}) {
  const [tipe, setTipe] = useState<Tipe>('berita')
  const [limitBerita, setLimitBerita] = useState(9)
  const [limitPengumuman, setLimitPengumuman] = useState(9)

  const displayedBerita = dataBerita.slice(0, limitBerita)
  const displayedPengumuman = dataPengumuman.slice(0, limitPengumuman)

  const hasMoreBerita = dataBerita.length > limitBerita
  const hasMorePengumuman = dataPengumuman.length > limitPengumuman

  return (
    <>
      <div className="pt-24 pb-12 text-center"
        style={{ background: 'linear-gradient(135deg,#0f2557,#1a3a80)' }}>
        <h1 className="text-4xl font-black text-white mt-4"
          style={{ fontFamily: 'var(--font-playfair),serif' }}>
          Berita & Pengumuman
        </h1>
        <p className="text-white/60 mt-2">Informasi terbaru dari {infoSekolah.nama}</p>
      </div>
      <div className="gold-line" />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-3 justify-center mb-14">
            {(['berita', 'pengumuman'] as Tipe[]).map((t) => (
              <button key={t} onClick={() => setTipe(t)}
                className={`cursor-pointer px-8 py-3 rounded-full border text-sm font-semibold transition-all capitalize ${
                  tipe === t ? 'tab-btn active bg-[#0f2557] text-white border-[#0f2557]' : 'border-gray-200 hover:border-gray-400'
                }`}
                style={tipe === t ? { background: '#0f2557', color: 'white', borderColor: '#0f2557' } : {}}>
                {t === 'berita' ? 'Berita' : 'Pengumuman'}
              </button>
            ))}
          </div>

          {tipe === 'berita' && (
            <>
              <div className="grid md:grid-cols-3 gap-8">
                {displayedBerita.map((b) => (
                  <Link key={b.id} href={`/berita/${b.slug}`}
                    className="card-hover block rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                    <div className="h-48 flex items-center justify-center bg-gray-100" style={{ background: b.warnaBg || '#0f2557' }}>
                      <i className={`fas ${b.icon || 'fa-newspaper'} text-white text-5xl opacity-40`} />
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
                      <h4 className="font-bold text-lg mb-2" style={{ color: '#0f2557' }}>{b.judul}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{b.ringkasan}</p>
                      <span className="inline-flex items-center gap-2 mt-4 text-sm font-semibold" style={{ color: '#0f2557' }}>
                        Baca Selengkapnya <i className="fas fa-arrow-right text-xs" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              
              {dataBerita.length === 0 && (
                <p className="text-center text-gray-400 py-12">Belum ada berita.</p>
              )}

              {hasMoreBerita && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setLimitBerita(prev => prev + 9)}
                    className="px-8 py-3 rounded-full font-bold border-2 border-[#0f2557] text-[#0f2557] hover:bg-[#0f2557] hover:text-white transition-all shadow-sm hover:shadow-md active:scale-95"
                  >
                    Muat Lebih Banyak Berita
                  </button>
                </div>
              )}
            </>
          )}

          {tipe === 'pengumuman' && (
            <>
              <div className="max-w-3xl mx-auto space-y-4">
                {displayedPengumuman.map((p) => {
                  const isPenting = p.prioritas === true
                  const colorValue = p.warnaKiri || (isPenting ? '#ef4444' : '#c8972a')

                  return (
                    <Link key={p.id} href={`/berita/${p.slug}`}
                      className="block flex items-start gap-4 p-5 rounded-r-xl border-l-4 transition-all hover:translate-x-2 hover:shadow-md"
                      style={{ borderColor: colorValue, background: '#f8faff' }}>
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: colorValue }}>
                        <i className="fas fa-bullhorn text-white text-sm" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-bold" style={{ color: '#0f2557' }}>{p.judul}</h4>
                          {isPenting && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-semibold">Penting</span>
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
                  )
                })}
              </div>

              {dataPengumuman.length === 0 && (
                <p className="text-center text-gray-400 py-12">Belum ada pengumuman.</p>
              )}

              {hasMorePengumuman && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setLimitPengumuman(prev => prev + 9)}
                    className="px-8 py-3 rounded-full font-bold border-2 border-[#0f2557] text-[#0f2557] hover:bg-[#0f2557] hover:text-white transition-all shadow-sm hover:shadow-md active:scale-95"
                  >
                    Muat Lebih Banyak Pengumuman
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
