'use client'

import { useState } from 'react'
import { formatTanggalIndonesia } from '@/lib/format'

function getDocumentIcon(tipeRaw: string) {
  const tipe = tipeRaw.toUpperCase()

  if (tipe === 'PDF') {
    return { icon: 'fa-file-pdf', color: '#ef4444' }
  }

  if (tipe === 'DOC' || tipe === 'DOCX') {
    return { icon: 'fa-file-word', color: '#2563eb' }
  }

  if (tipe === 'XLS' || tipe === 'XLSX') {
    return { icon: 'fa-file-excel', color: '#16a34a' }
  }

  return { icon: 'fa-file-lines', color: '#0f2557' }
}

export default function UnduhanClient({ dataDokumen }: { dataDokumen: any[] }) {
  const [cari, setCari] = useState('')

  const filtered = dataDokumen.filter((d) =>
    (d.keyword || '').toLowerCase().includes(cari.toLowerCase()) ||
    d.nama.toLowerCase().includes(cari.toLowerCase())
  )

  return (
    <>
      <div className="pt-24 pb-12 text-center"
        style={{ background: 'linear-gradient(135deg,#0f2557,#1a3a80)' }}>
        <span className="text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest"
          style={{ background: 'rgba(200,151,42,0.2)', color: '#e6b84a' }}>
          Dokumen Resmi
        </span>
        <h1 className="text-4xl font-black text-white mt-4"
          style={{ fontFamily: 'var(--font-playfair),serif' }}>
          Unduhan Dokumen
        </h1>
        <p className="text-white/60 mt-2">
          Dokumen-dokumen penting yang dapat diunduh secara gratis
        </p>
      </div>
      <div className="gold-line" />

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="relative mb-8">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari dokumen..."
              value={cari}
              onChange={(e) => setCari(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#0f2557] transition-colors"
              style={{ fontFamily: 'inherit' }}
            />
          </div>

          <div className="space-y-3">
            {filtered.map((d) => {
              const fallback = getDocumentIcon(d.tipe)

              return (
                <div key={d.id}
                  className="dl-row flex items-center gap-4 p-4 rounded-xl border border-gray-100">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: d.warnaBg || '#eff6ff' }}>
                    <i className={`fas ${d.icon || fallback.icon} text-xl`}
                      style={{ color: d.warnaIcon || fallback.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate" style={{ color: '#0f2557' }}>{d.nama}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {d.tipe.toUpperCase()} • {d.ukuran} • Diupload {formatTanggalIndonesia(d.tanggal)}
                    </p>
                  </div>
                  {d.url && d.url !== '#' ? (
                    <a
                      href={d.url}
                      className="px-4 py-2 rounded-lg text-sm font-semibold text-white flex items-center gap-2 flex-shrink-0 hover:opacity-90 transition-opacity"
                      style={{ background: '#0f2557' }}
                      download
                      target={d.url.startsWith('http') ? '_blank' : undefined}
                      rel={d.url.startsWith('http') ? 'noreferrer' : undefined}
                    >
                      <i className="fas fa-download" /> Unduh
                    </a>
                  ) : (
                    <span
                      className="px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 flex-shrink-0"
                      style={{ background: '#e5e7eb', color: '#6b7280' }}
                    >
                      <i className="fas fa-ban" /> Belum ada file
                    </span>
                  )}
                </div>
              )
            })}
            {filtered.length === 0 && (
              <p className="text-center text-gray-400 py-12">
                Tidak ditemukan dokumen untuk &ldquo;{cari}&rdquo;
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
