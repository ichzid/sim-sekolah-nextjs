'use client'

import { useState } from 'react'

export default function KontakClient({
  infoSekolah,
}: {
  infoSekolah: {
    nama: string
    alamat: string
    kota: string
    kodePos: string
    telepon: string
    email: string
    website: string
    jamOperasional: string
    googleMapsUrl: string
    facebookUrl: string
    instagramUrl: string
    youtubeUrl: string
    whatsappUrl: string
  }
}) {
  const [terkirim, setTerkirim] = useState(false)
  const [form, setForm] = useState({
    nama: '',
    email: '',
    telepon: '',
    keperluan: '',
    pesan: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTerkirim(true)
    setTimeout(() => setTerkirim(false), 4000)
    setForm({ nama: '', email: '', telepon: '', keperluan: '', pesan: '' })
  }

  const kontak = [
    { icon: 'fa-map-marker-alt', label: 'Alamat', nilai: `${infoSekolah.alamat}, ${infoSekolah.kota} ${infoSekolah.kodePos}` },
    { icon: 'fa-phone', label: 'Telepon', nilai: infoSekolah.telepon },
    { icon: 'fa-envelope', label: 'Email', nilai: infoSekolah.email },
    { icon: 'fa-globe', label: 'Website', nilai: infoSekolah.website },
    { icon: 'fa-clock', label: 'Jam Operasional', nilai: infoSekolah.jamOperasional },
  ]
  const socialLinks = [
    { icon: 'fab fa-facebook-f', bg: '#1877f2', label: 'Facebook', href: infoSekolah.facebookUrl },
    { icon: 'fab fa-instagram', bg: 'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)', label: 'Instagram', href: infoSekolah.instagramUrl },
    { icon: 'fab fa-youtube', bg: '#ff0000', label: 'YouTube', href: infoSekolah.youtubeUrl },
    { icon: 'fab fa-whatsapp', bg: '#25d366', label: 'WhatsApp', href: infoSekolah.whatsappUrl },
  ]

  return (
    <>
      <div className="pt-24 pb-12 text-center"
        style={{ background: 'linear-gradient(135deg,#0f2557,#1a3a80)' }}>
        <span className="text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest"
          style={{ background: 'rgba(200,151,42,0.2)', color: '#e6b84a' }}>
          Hubungi Kami
        </span>
        <h1 className="text-4xl font-black text-white mt-4"
          style={{ fontFamily: 'var(--font-playfair),serif' }}>
          Kontak & Lokasi
        </h1>
        <p className="text-white/60 mt-2">Kami selalu siap membantu Anda</p>
      </div>
      <div className="gold-line" />

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#0f2557' }}>Kirim Pesan</h3>

              {terkirim && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                  <i className="fas fa-check-circle mr-2" />
                  Pesan berhasil dikirim! Kami akan merespons dalam 1x24 jam.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <input type="text" placeholder="Nama Lengkap" required
                      value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Email Aktif" required
                      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <input type="tel" placeholder="Nomor Telepon"
                    value={form.telepon} onChange={e => setForm({ ...form, telepon: e.target.value })} />
                </div>
                <div className="form-group">
                  <select required value={form.keperluan}
                    onChange={e => setForm({ ...form, keperluan: e.target.value })}>
                    <option value="">-- Pilih Keperluan --</option>
                    <option>Informasi PPDB</option>
                    <option>Informasi Akademik</option>
                    <option>Kerjasama & Kemitraan</option>
                    <option>Pengaduan</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea rows={5} placeholder="Tulis pesan Anda di sini..." required
                    value={form.pesan} onChange={e => setForm({ ...form, pesan: e.target.value })} />
                </div>
                <button type="submit"
                  className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg,#0f2557,#1a3a80)' }}>
                  <i className="fas fa-paper-plane mr-2" /> Kirim Pesan
                </button>
              </form>

              <div className="mt-8 space-y-4">
                {kontak.map((k, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: '#0f2557' }}>
                      <i className={`fas ${k.icon} text-white text-sm`} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#0f2557' }}>{k.label}</p>
                      <p className="text-sm text-gray-500">{k.nilai}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#0f2557' }}>Lokasi Kami</h3>
              <div className="rounded-2xl overflow-hidden relative"
                style={{ height: '400px', background: 'linear-gradient(135deg,#e3e8f0,#c5d0e0)' }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ zIndex: 1 }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
                    style={{ background: '#0f2557' }}>
                    <i className="fas fa-school text-white text-2xl" />
                  </div>
                  <p className="font-bold text-lg" style={{ color: '#0f2557' }}>{infoSekolah.nama}</p>
                  <p className="text-sm text-gray-600 mt-1">{infoSekolah.alamat}, {infoSekolah.kota}</p>
                  <a href={infoSekolah.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-6 py-2 rounded-full text-sm font-semibold text-white"
                    style={{ background: '#0f2557' }}>
                    <i className="fab fa-google" /> Buka di Google Maps
                  </a>
                </div>
                <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a3a80" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold mb-3" style={{ color: '#0f2557' }}>Ikuti Kami</p>
                <div className="flex gap-3">
                  {socialLinks.map((s) => (
                    <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-all hover:scale-110"
                      style={{ background: s.bg }}>
                      <i className={s.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
