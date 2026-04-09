'use client'

import { useState } from 'react'

type Kategori = 'semua' | 'pimpinan' | 'guru' | 'staf'

const ikonMap: Record<string, string> = {
  pimpinan: 'fa-user-tie',
  guru: 'fa-chalkboard-teacher',
  staf: 'fa-user-cog',
}

export default function GuruClient({ dataGuru }: { dataGuru: any[] }) {
  const [filter, setFilter] = useState<Kategori>('semua')

  const filtered = dataGuru.filter(
    (g) => filter === 'semua' || g.kategori === filter
  )

  const filters: { id: Kategori; label: string }[] = [
    { id: 'semua', label: 'Semua' },
    { id: 'pimpinan', label: 'Pimpinan' },
    { id: 'guru', label: 'Guru Mapel' },
    { id: 'staf', label: 'Tenaga Kependidikan' },
  ]

  return (
    <>
      <div className="pt-24 pb-12 text-center"
        style={{ background: 'linear-gradient(135deg,#0f2557,#1a3a80)' }}>
        <h1 className="text-4xl font-black text-white mt-4"
          style={{ fontFamily: 'var(--font-playfair),serif' }}>
          Guru & Tenaga Kependidikan
        </h1>
        <p className="text-white/60 mt-2 max-w-xl mx-auto">
          Tim profesional berpengalaman yang berdedikasi membimbing setiap siswa menuju potensi terbaiknya.
        </p>
      </div>
      <div className="gold-line" />

      <section className="py-20" style={{ background: '#fdf8f0' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`cursor-pointer px-6 py-2 rounded-full border text-sm font-medium transition-all ${
                  filter === f.id ? 'tab-btn active bg-[#0f2557] text-white border-[#0f2557]' : 'border-gray-200 hover:border-gray-400'
                }`}
                style={filter === f.id ? { background: '#0f2557', color: 'white', borderColor: '#0f2557' } : {}}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((g) => {
              const extractColor = (bg: string) =>
                bg.match(/#[0-9a-fA-F]{6}/)?.[0] ?? '#0f2557'
              return (
                <div key={g.id} className="card-hover bg-white rounded-2xl overflow-hidden shadow-sm">
                  <div className="h-40 flex items-center justify-center"
                    style={{ background: g.warnaBg }}>
                    <i className={`fas ${ikonMap[g.kategori] ?? 'fa-user'} text-white text-5xl`} />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-bold px-2 py-1 rounded text-white"
                      style={{ background: extractColor(g.warnaBg) }}>
                      {g.jabatan}
                    </span>
                    <h4 className="font-bold mt-2" style={{ color: '#0f2557' }}>{g.nama}</h4>
                    <p className="text-sm text-gray-400">{g.mapel}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      <i className="fas fa-graduation-cap mr-1" />{g.pendidikan}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      <i className="fas fa-clock mr-1" />{g.pengalaman} pengalaman
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-gray-400 py-12">Tidak ada data untuk kategori ini.</p>
          )}
        </div>
      </section>
    </>
  )
}
