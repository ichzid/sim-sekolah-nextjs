'use client'

import { useState } from 'react'
import Link from 'next/link'
import { submitPpdb } from '@/actions/ppdb'

type AccordionIndex = number | null

export default function PpdbClient({ infoSekolah }: { infoSekolah: any }) {
  const [openFaq, setOpenFaq] = useState<AccordionIndex>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const faqs = [
    {
      q: 'Apa saja berkas yang harus disiapkan?',
      a: '• Kartu Keluarga (KK) asli dan fotokopi\n• Akta kelahiran asli dan fotokopi\n• Ijazah/STTB TK atau dokumen sederajat\n• Pas foto 3x4 (4 lembar, background merah)\n• Sertifikat prestasi (jika ada)',
    },
    {
      q: 'Berapa biaya pendidikan di ' + infoSekolah.nama + '?',
      a: infoSekolah.nama + ' adalah sekolah yang berkomitmen menghadirkan pendidikan berkualitas. Biaya pendidikan bersumber dari dana BOS dan iuran yang transparan. Hubungi sekolah untuk informasi detail.',
    },
    {
      q: 'Bagaimana cara mengecek status pendaftaran?',
      a: 'Status pendaftaran dapat dicek melalui portal PPDB online menggunakan nomor pendaftaran. Panitia juga akan menghubungi via telepon atau WhatsApp yang terdaftar.',
    },
  ]

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries()) as any

    const res = await submitPpdb(data)
    if (res.success) {
      setSuccess(true)
      ;(e.target as HTMLFormElement).reset()
    } else {
      setErrorMsg(res.error || 'Gagal mengirim form')
    }
    setLoading(false)
  }

  return (
    <>
      <div className="pt-24 pb-12 text-center"
        style={{ background: 'linear-gradient(135deg,#0f2557,#1a3a80)' }}>
        <span className="text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest"
          style={{ background: 'rgba(200,151,42,0.2)', color: '#e6b84a' }}>
          Penerimaan Peserta Didik Baru
        </span>
        <h1 className="text-4xl font-black text-white mt-4"
          style={{ fontFamily: 'var(--font-playfair),serif' }}>
          PPDB 2025/2026
        </h1>
        <p className="text-white/60 mt-2">
          Daftarkan putra-putri Anda sekarang
        </p>
      </div>
      <div className="gold-line" />

      <section className="py-20" style={{ background: '#fdf8f0' }}>
        <div className="max-w-7xl mx-auto px-4">

          <div className="rounded-3xl p-8 md:p-12 mb-12 text-white text-center"
            style={{ background: 'linear-gradient(135deg,#0f2557,#1a3a80)' }}>
            <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
              style={{ background: 'rgba(200,151,42,0.25)', color: '#e6b84a' }}>
              <i className="fas fa-fire mr-2" />Pendaftaran Sedang Dibuka!
            </div>
            <h3 className="text-3xl font-bold mb-3">Pendaftaran Online PPDB</h3>
            <p className="text-white/70 mb-6 max-w-lg mx-auto">
              Periode pendaftaran: 1 April – 30 Juni 2025. Tersedia 60 kursi untuk Tahun Ajaran 2025/2026.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { nilai: '60', label: 'Kursi Tersedia' },
                { nilai: '2', label: 'Rombel' },
                { nilai: '3', label: 'Jalur Seleksi' },
              ].map((s, i) => (
                <div key={i} className="stat-card rounded-xl px-8 py-4 text-center">
                  <div className="text-3xl font-black" style={{ color: '#e6b84a' }}>{s.nilai}</div>
                  <div className="text-white/60 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#0f2557', fontFamily: 'var(--font-playfair),serif' }}>
                Jalur Seleksi
              </h3>
              <div className="space-y-4">
                {[
                  { jalur: 'Jalur Reguler', persen: '60%', warna: '#0f2557', ket: 'Pendaftaran umum berdasarkan kelengkapan berkas dan tes seleksi.' },
                  { jalur: 'Jalur Prestasi', persen: '25%', warna: '#c8972a', ket: 'Berdasarkan prestasi akademik atau non-akademik yang dibuktikan dengan sertifikat.' },
                  { jalur: 'Jalur Afirmasi', persen: '15%', warna: '#16a34a', ket: 'Untuk siswa dari keluarga kurang mampu dengan bukti KIP atau KKS.' },
                ].map((j, i) => (
                  <div key={i} className="p-5 bg-white rounded-2xl border-l-4 shadow-sm"
                    style={{ borderColor: j.warna }}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold" style={{ color: '#0f2557' }}>{j.jalur}</h4>
                      <span className="text-xs font-bold px-2 py-1 rounded text-white"
                        style={{ background: j.warna }}>{j.persen} Kuota</span>
                    </div>
                    <p className="text-sm text-gray-500">{j.ket}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#0f2557', fontFamily: 'var(--font-playfair),serif' }}>
                Formulir Pendaftaran
              </h3>
              <p className="text-sm text-gray-500 mb-6">Isi formulir berikut dengan data yang valid. Tim kami akan menghubungi Anda.</p>
              
              {success ? (
                <div className="bg-green-50 text-green-700 p-6 rounded-2xl border border-green-200 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-check text-2xl text-green-600" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Pendaftaran Berhasil!</h4>
                  <p className="text-sm">Terima kasih telah mendaftar. Data Anda telah kami terima dan berstatus Pending. Silakan tunggu informasi selanjutnya dari Panitia PPDB.</p>
                  <button onClick={() => setSuccess(false)} className="mt-4 text-sm font-semibold text-green-700 underline">
                    Daftar Baru
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
                      <i className="fas fa-exclamation-circle mr-2" /> {errorMsg}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Nama Lengkap</label>
                      <input type="text" name="namaLengkap" required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#0f2557]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">NISN (opsional)</label>
                      <input type="text" name="nisn" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#0f2557]" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Tanggal Lahir</label>
                      <input type="date" name="tanggalLahir" required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#0f2557]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Asal Sekolah TK</label>
                      <input type="text" name="asalSekolah" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#0f2557]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Nama Orang Tua/Wali</label>
                      <input type="text" name="namaOrtu" required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#0f2557]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">No. WhatsApp Ortu</label>
                      <input type="tel" name="teleponOrtu" required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#0f2557]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Jalur Pendaftaran</label>
                    <select name="jalur" required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#0f2557] bg-white">
                      <option value="">Pilih Jalur</option>
                      <option value="reguler">Jalur Reguler</option>
                      <option value="prestasi">Jalur Prestasi</option>
                      <option value="afirmasi">Jalur Afirmasi</option>
                    </select>
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full py-3 rounded-xl font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 flex justify-center items-center gap-2"
                    style={{ background: 'linear-gradient(135deg,#c8972a,#e6b84a)' }}>
                    {loading ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-paper-plane" />}
                    Kirim Pendaftaran
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold mb-6 text-center"
              style={{ color: '#0f2557', fontFamily: 'var(--font-playfair),serif' }}>
              FAQ PPDB
            </h3>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left font-semibold"
                    style={{ color: '#0f2557' }}>
                    {faq.q}
                    <i className={`fas fa-chevron-down transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`transition-all duration-300 ${openFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="px-5 pb-5 text-sm text-gray-500 whitespace-pre-line">{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
