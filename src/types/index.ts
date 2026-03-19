export interface InfoSekolah {
  nama: string
  singkatan: string
  npsn: string
  akreditasi: string
  tahunBerdiri: string
  kepalaSekolah: string
  alamat: string
  kota: string
  kodePos: string
  telepon: string
  email: string
  website: string
  jamOperasional?: string
  googleMapsUrl?: string
  facebookUrl?: string
  instagramUrl?: string
  youtubeUrl?: string
  whatsappUrl?: string
  visi: string
  misi: string[]
  statistikSekolah?: StatSekolah[]
  prestasiSekolah?: Prestasi[]
  sambutanKepalaSekolah?: string
  motto: string
}

export interface Guru {
  id: number
  nama: string
  jabatan: string
  mapel: string
  pendidikan: string
  pengalaman: string
  kategori: 'pimpinan' | 'guru' | 'staf'
  warnaBg: string
}

export interface Berita {
  id: number
  slug?: string
  judul: string
  ringkasan: string
  kategori: string
  tanggal: string
  tipe: 'berita' | 'pengumuman'
  prioritas?: boolean
  warnaBg?: string
  warnaKiri?: string
  icon?: string
}

export interface ItemGaleri {
  id: number
  judul: string
  keterangan: string
  kategori: 'akademik' | 'ekskul' | 'event'
  icon: string
  warnaBg: string
  ukuran?: 'normal' | 'besar' | 'lebar'
}

export interface Dokumen {
  id: number
  nama: string
  ukuran: string
  tanggal: string
  tipe: string
  icon: string
  warnaIcon: string
  warnaBg: string
  keyword: string
}

export interface StatSekolah {
  nilai: string
  label: string
}

export interface Prestasi {
  icon: string
  judul: string
  keterangan: string
}

export interface FAQ {
  pertanyaan: string
  jawaban: string
}
