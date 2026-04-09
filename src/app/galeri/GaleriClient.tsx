'use client'

import { useState } from 'react'

type Kat = 'semua' | 'akademik' | 'ekskul' | 'event'

export default function GaleriClient({ dataGaleri }: { dataGaleri: any[] }) {
  const [filter, setFilter] = useState<Kat>('semua')

  const filtered = dataGaleri.filter(
    (g) => filter === 'semua' || g.kategori === filter
  )

  const filters: { id: Kat; label: string }[] = [
    { id: 'semua', label: 'Semua' },
    { id: 'akademik', label: 'Akademik' },
    { id: 'ekskul', label: 'Ekstrakurikuler' },
    { id: 'event', label: 'Event' },
  ]

  return (
    <>
      {/* Header */}
      <div className="pt-24 pb-12 text-center"
        style={{ background: '#0f2557' }}>
        <h1 className="text-4xl font-black text-white mt-4"
          style={{ fontFamily: 'var(--font-playfair),serif' }}>
          Galeri Foto
        </h1>
        <p className="text-white/60 mt-2">Momen-momen terbaik kegiatan sekolah</p>
      </div>
      <div className="gold-line" />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filter */}
          <div className="flex gap-3 justify-center mb-8 flex-wrap">
            {filters.map((f) => (
              <button key={f.id} onClick={() => setFilter(f.id)}
                className={`cursor-pointer px-6 py-2 rounded-full border text-sm font-medium transition-all ${
                  filter === f.id ? 'tab-btn active bg-[#0f2557] text-white border-[#0f2557]' : 'border-gray-200 hover:border-gray-400'
                }`}
                style={filter === f.id ? { background: '#0f2557', color: 'white', borderColor: '#0f2557' } : {}}>
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <div key={item.id}
                className={`gallery-item rounded-2xl overflow-hidden cursor-pointer ${
                  item.ukuran === 'besar' ? 'col-span-2 row-span-2' :
                  item.ukuran === 'lebar' ? 'col-span-2' : ''
                }`}
                style={{
                  height: item.ukuran === 'besar' ? '280px' : '130px',
                  background: item.warnaBg || '#1a3a80',
                }}>
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <i className={`fas ${item.icon || 'fa-image'} text-white opacity-50 mb-2 ${item.ukuran === 'besar' ? 'text-6xl mb-3' : 'text-3xl'}`} />
                  <p className={`text-white font-medium ${item.ukuran === 'besar' ? 'text-base' : 'text-sm'}`}>{item.judul}</p>
                  {item.ukuran === 'besar' && item.keterangan && (
                    <p className="text-white/50 text-sm mt-1">{item.keterangan}</p>
                  )}
                </div>
                <div className="gallery-overlay">
                  <i className="fas fa-search-plus text-white text-3xl" />
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-gray-400 py-12">Tidak ada foto untuk kategori ini.</p>
          )}
        </div>
      </section>
    </>
  )
}
