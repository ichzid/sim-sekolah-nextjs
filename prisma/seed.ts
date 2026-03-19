import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  await prisma.pendaftarPPDB.deleteMany()
  await prisma.dokumen.deleteMany()
  await prisma.itemGaleri.deleteMany()
  await prisma.guru.deleteMany()
  await prisma.berita.deleteMany()
  await prisma.infoSekolah.deleteMany()
  await prisma.user.deleteMany()

  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.create({
    data: {
      email: 'admin@sekolah.sch.id',
      password: hashedPassword,
      nama: 'Administrator SIM Sekolah',
      role: 'admin',
    },
  })

  await prisma.infoSekolah.create({
    data: {
      nama: 'SD Muhammadiyah Danau Sijabut',
      singkatan: 'SD Muhda Sijabut',
      npsn: '10202012',
      akreditasi: 'A',
      tahunBerdiri: '1980',
      kepalaSekolah: 'Dra. Siti Rahmawati, M.Pd.',
      alamat: 'Jl. Pendidikan Muhammadiyah No. 1, Danau Sijabut',
      kota: 'Kabupaten Asahan',
      kodePos: '21252',
      telepon: '(0623) 555-0001',
      email: 'info@sdmuhda-sijabut.sch.id',
      website: 'www.sdmuhda-sijabut.sch.id',
      jamOperasional: 'Senin-Jumat: 07.00-15.00 WIB',
      googleMapsUrl: 'https://maps.google.com/?q=SD+Muhammadiyah+Danau+Sijabut',
      facebookUrl: 'https://facebook.com/sdmuhdasijabut',
      instagramUrl: 'https://instagram.com/sdmuhdasijabut',
      youtubeUrl: 'https://youtube.com/@sdmuhdasijabut',
      whatsappUrl: 'https://wa.me/6281234567890',
      visi:
        'Menjadi sekolah dasar Islam unggulan yang membentuk generasi beriman, berprestasi, dan berkarakter Muhammadiyah.',
      misi: JSON.stringify([
        'Menyelenggarakan pembelajaran yang aktif, menyenangkan, dan berpusat pada murid.',
        'Menguatkan pembiasaan ibadah, akhlak mulia, dan kepedulian sosial.',
        'Mengembangkan potensi akademik, literasi digital, olahraga, dan seni secara seimbang.',
        'Membangun budaya sekolah yang bersih, aman, dan ramah anak.',
        'Menjalin kolaborasi yang erat dengan orang tua dan masyarakat.',
      ]),
      statistikSekolah: JSON.stringify([
        { nilai: '45+', label: 'Tahun Berdiri' },
        { nilai: '400+', label: 'Siswa Aktif' },
        { nilai: '97%', label: 'Kelulusan' },
        { nilai: '30+', label: 'Tenaga Pengajar' },
      ]),
      prestasiSekolah: JSON.stringify([
        { icon: 'fa-trophy', judul: 'Juara 1 Olimpiade Matematika', keterangan: 'Tingkat Kabupaten - 2024' },
        { icon: 'fa-medal', judul: 'Juara 2 O2SN Pencak Silat', keterangan: 'Tingkat Provinsi - 2023' },
        { icon: 'fa-award', judul: 'Sekolah Adiwiyata', keterangan: 'Kabupaten Asahan - 2023' },
        { icon: 'fa-book', judul: 'Juara 1 Lomba Baca Quran', keterangan: 'Tingkat Kabupaten - 2024' },
        { icon: 'fa-music', judul: 'Juara 1 Seni Budaya Pelajar', keterangan: 'Tingkat Kecamatan - 2024' },
        { icon: 'fa-star', judul: 'Sekolah Unggulan Muhammadiyah', keterangan: 'PDM Asahan - 2023' },
      ]),
      sambutanKepalaSekolah:
        'Puji syukur ke hadirat Allah SWT atas segala limpahan rahmat dan karunia-Nya, sehingga SD Muhammadiyah Danau Sijabut dapat terus berkarya dan berprestasi dalam dunia pendidikan Indonesia.\n\nSebagai kepala sekolah, saya senantiasa berkomitmen untuk memberikan yang terbaik bagi seluruh warga sekolah, yaitu siswa, guru, dan tenaga kependidikan, dalam menciptakan iklim belajar yang positif, inklusif, dan berpusat pada murid.\n\nKami percaya bahwa setiap siswa memiliki potensi yang unik dan berharga. Tugas kami adalah memfasilitasi, membimbing, dan menginspirasi mereka untuk menemukan versi terbaik dirinya, bukan hanya dalam prestasi akademik, tetapi juga dalam pembentukan karakter yang kokoh.\n\nKami juga mengundang seluruh pemangku kepentingan, mulai dari orang tua, masyarakat, hingga mitra pendidikan, untuk bersama-sama membangun ekosistem pendidikan yang kuat demi masa depan generasi yang lebih cerah.',
      motto: 'Cerdas, Berakhlak, Berprestasi',
    },
  })

  await prisma.berita.createMany({
    data: [
      {
        slug: 'tim-olimpiade-matematika-sd-muhda-raih-juara-1-kabupaten',
        judul: 'Tim Olimpiade Matematika SD Muhda Raih Juara 1 Kabupaten',
        ringkasan: 'Tiga siswa kelas VI membawa pulang medali emas dan mengharumkan nama sekolah pada ajang Olimpiade Matematika tingkat kabupaten.',
        isi: 'Prestasi ini diraih setelah pembinaan intensif selama dua bulan oleh tim guru matematika.',
        kategori: 'Prestasi',
        tanggal: '2026-02-14',
        tipe: 'berita',
        warnaBg: 'linear-gradient(135deg,#0f2557,#2a5298)',
        warnaKiri: '#0f2557',
        icon: 'fa-trophy',
        published: true,
      },
      {
        slug: 'pembukaan-program-literasi-pagi-semester-genap',
        judul: 'Pembukaan Program Literasi Pagi Semester Genap',
        ringkasan: 'Sekolah memulai program literasi pagi 15 menit sebelum pelajaran sebagai bagian dari penguatan budaya membaca.',
        isi: 'Program melibatkan sudut baca kelas, jurnal membaca, dan kunjungan rutin ke perpustakaan mini.',
        kategori: 'Akademik',
        tanggal: '2026-01-20',
        tipe: 'berita',
        warnaBg: 'linear-gradient(135deg,#0f2557,#2a5298)',
        warnaKiri: '#0f2557',
        icon: 'fa-book-open',
        published: true,
      },
      {
        slug: 'ekstrakurikuler-tapak-suci-tampil-memukau-di-milad-sekolah',
        judul: 'Ekstrakurikuler Tapak Suci Tampil Memukau di Milad Sekolah',
        ringkasan: 'Penampilan kolosal Tapak Suci dan drum band menjadi salah satu sorotan utama pada perayaan milad sekolah ke-46.',
        isi: 'Kegiatan dihadiri wali murid, PCM setempat, dan tokoh masyarakat sekitar sekolah.',
        kategori: 'Kegiatan',
        tanggal: '2025-11-02',
        tipe: 'berita',
        warnaBg: 'linear-gradient(135deg,#0f2557,#2a5298)',
        warnaKiri: '#0f2557',
        icon: 'fa-music',
        published: true,
      },
      {
        slug: 'kelas-vi-mengikuti-try-out-berbasis-komputer',
        judul: 'Kelas VI Mengikuti Try Out Berbasis Komputer',
        ringkasan: 'Try out berbasis komputer dilaksanakan untuk memetakan kesiapan siswa menghadapi asesmen akhir tahun.',
        isi: 'Pelaksanaan dibagi dua sesi dengan pendampingan operator dan wali kelas.',
        kategori: 'Asesmen',
        tanggal: '2026-03-05',
        tipe: 'berita',
        warnaBg: 'linear-gradient(135deg,#0f2557,#2a5298)',
        warnaKiri: '#0f2557',
        icon: 'fa-laptop',
        published: true,
      },
      {
        slug: 'pengumuman-jadwal-ulang-pertemuan-wali-murid-kelas-i',
        judul: 'Pengumuman Jadwal Ulang Pertemuan Wali Murid Kelas I',
        ringkasan: 'Pertemuan wali murid kelas I diundur ke hari Sabtu karena adanya agenda dinas luar kepala sekolah.',
        isi: 'Mohon wali murid memperhatikan jadwal baru yang dibagikan melalui grup kelas.',
        kategori: 'Informasi',
        tanggal: '2026-03-10',
        tipe: 'pengumuman',
        prioritas: true,
        warnaBg: 'linear-gradient(135deg,#991b1b,#dc2626)',
        warnaKiri: '#dc2626',
        icon: 'fa-bullhorn',
        published: true,
      },
      {
        slug: 'pembayaran-seragam-gelombang-2-dibuka-sampai-25-april',
        judul: 'Pembayaran Seragam Gelombang 2 Dibuka Sampai 25 April',
        ringkasan: 'Bagian tata usaha membuka pembayaran seragam gelombang 2 bagi murid baru yang belum melakukan pelunasan.',
        isi: 'Pembayaran dapat dilakukan di loket TU pada jam kerja.',
        kategori: 'Administrasi',
        tanggal: '2026-04-01',
        tipe: 'pengumuman',
        prioritas: false,
        warnaBg: 'linear-gradient(135deg,#9a6700,#c8972a)',
        warnaKiri: '#c8972a',
        icon: 'fa-bullhorn',
        published: true,
      },
      {
        slug: 'hasil-seleksi-ppdb-gelombang-1-telah-diumumkan',
        judul: 'Hasil Seleksi PPDB Gelombang 1 Telah Diumumkan',
        ringkasan: 'Calon peserta didik dapat melihat hasil seleksi gelombang 1 melalui halaman pengumuman dan papan informasi sekolah.',
        isi: 'Berkas daftar ulang wajib dilengkapi paling lambat tiga hari kerja setelah pengumuman.',
        kategori: 'PPDB',
        tanggal: '2026-05-18',
        tipe: 'pengumuman',
        prioritas: true,
        warnaBg: 'linear-gradient(135deg,#991b1b,#dc2626)',
        warnaKiri: '#dc2626',
        icon: 'fa-bullhorn',
        published: true,
      },
      {
        slug: 'agenda-class-meeting-dan-pentas-seni-akhir-semester',
        judul: 'Agenda Class Meeting dan Pentas Seni Akhir Semester',
        ringkasan: 'Sekolah menyiapkan class meeting, bazar siswa, dan pentas seni selama pekan penutupan semester.',
        isi: 'Setiap kelas menampilkan satu karya terbaik di panggung utama sekolah.',
        kategori: 'Event',
        tanggal: '2026-06-12',
        tipe: 'pengumuman',
        prioritas: false,
        warnaBg: 'linear-gradient(135deg,#9a6700,#c8972a)',
        warnaKiri: '#c8972a',
        icon: 'fa-calendar-days',
        published: false,
      },
    ],
  })

  await prisma.guru.createMany({
    data: [
      { nama: 'Dra. Siti Rahmawati, M.Pd.', jabatan: 'Kepala Sekolah', mapel: 'Manajemen Pendidikan', pendidikan: 'S2 Manajemen Pendidikan', pengalaman: '21 tahun', kategori: 'pimpinan', warnaBg: 'linear-gradient(135deg,#0f2557,#1a3a80)' },
      { nama: 'Ahmad Fauzi, S.Pd.', jabatan: 'Wakasek Kurikulum', mapel: 'Matematika', pendidikan: 'S1 Pendidikan Matematika', pengalaman: '14 tahun', kategori: 'pimpinan', warnaBg: 'linear-gradient(135deg,#0f2557,#1a3a80)' },
      { nama: 'Nur Aisyah, S.Pd.', jabatan: 'Guru Kelas I-A', mapel: 'Tematik', pendidikan: 'S1 PGSD', pengalaman: '9 tahun', kategori: 'guru', warnaBg: 'linear-gradient(135deg,#0369a1,#0ea5e9)' },
      { nama: 'Rizki Ananda, S.Pd.', jabatan: 'Guru Kelas I-B', mapel: 'Tematik', pendidikan: 'S1 PGSD', pengalaman: '7 tahun', kategori: 'guru', warnaBg: 'linear-gradient(135deg,#0369a1,#0ea5e9)' },
      { nama: 'Maya Kartika, S.Pd.', jabatan: 'Guru Kelas II', mapel: 'Tematik', pendidikan: 'S1 PGSD', pengalaman: '11 tahun', kategori: 'guru', warnaBg: 'linear-gradient(135deg,#0369a1,#0ea5e9)' },
      { nama: 'Heri Saputra, S.Pd.', jabatan: 'Guru Kelas III', mapel: 'Tematik', pendidikan: 'S1 PGSD', pengalaman: '10 tahun', kategori: 'guru', warnaBg: 'linear-gradient(135deg,#0369a1,#0ea5e9)' },
      { nama: 'Lina Marlina, S.Pd.', jabatan: 'Guru Kelas IV', mapel: 'Tematik', pendidikan: 'S1 PGSD', pengalaman: '8 tahun', kategori: 'guru', warnaBg: 'linear-gradient(135deg,#0369a1,#0ea5e9)' },
      { nama: 'Muhammad Fikri, S.Pd.I.', jabatan: 'Guru PAI', mapel: 'Pendidikan Agama Islam', pendidikan: 'S1 PAI', pengalaman: '12 tahun', kategori: 'guru', warnaBg: 'linear-gradient(135deg,#0369a1,#0ea5e9)' },
      { nama: 'Dewi Lestari, S.Pd.', jabatan: 'Guru Bahasa Inggris', mapel: 'Bahasa Inggris', pendidikan: 'S1 Pendidikan Bahasa Inggris', pengalaman: '6 tahun', kategori: 'guru', warnaBg: 'linear-gradient(135deg,#0369a1,#0ea5e9)' },
      { nama: 'Rio Pratama, S.Pd.', jabatan: 'Guru PJOK', mapel: 'PJOK', pendidikan: 'S1 Pendidikan Olahraga', pengalaman: '9 tahun', kategori: 'guru', warnaBg: 'linear-gradient(135deg,#0369a1,#0ea5e9)' },
      { nama: 'Nurhaliza, S.Sn.', jabatan: 'Pembina Seni', mapel: 'Seni Budaya', pendidikan: 'S1 Seni Musik', pengalaman: '5 tahun', kategori: 'guru', warnaBg: 'linear-gradient(135deg,#0369a1,#0ea5e9)' },
      { nama: 'Rina Wulandari, A.Md.', jabatan: 'Kepala TU', mapel: 'Administrasi', pendidikan: 'D3 Administrasi Perkantoran', pengalaman: '13 tahun', kategori: 'staf', warnaBg: 'linear-gradient(135deg,#374151,#6b7280)' },
      { nama: 'Bagus Setiawan, S.Kom.', jabatan: 'Operator Sekolah', mapel: 'Sistem Informasi', pendidikan: 'S1 Sistem Informasi', pengalaman: '6 tahun', kategori: 'staf', warnaBg: 'linear-gradient(135deg,#374151,#6b7280)' },
      { nama: 'Sulastri', jabatan: 'Pustakawan', mapel: 'Layanan Perpustakaan', pendidikan: 'SMA', pengalaman: '8 tahun', kategori: 'staf', warnaBg: 'linear-gradient(135deg,#374151,#6b7280)' },
    ],
  })

  await prisma.itemGaleri.createMany({
    data: [
      { judul: 'Kegiatan Literasi Pagi', keterangan: 'Siswa membaca bersama sebelum pembelajaran dimulai.', kategori: 'akademik', icon: 'fa-book-open', warnaBg: 'linear-gradient(135deg,#0f2557,#1d4ed8)', ukuran: 'besar', aktif: true },
      { judul: 'Praktik Sains Sederhana', keterangan: 'Eksperimen perubahan wujud benda kelas IV.', kategori: 'akademik', icon: 'fa-flask', warnaBg: 'linear-gradient(135deg,#0f2557,#2563eb)', ukuran: 'normal', aktif: true },
      { judul: 'Tapak Suci', keterangan: 'Latihan rutin ekstrakurikuler Tapak Suci.', kategori: 'ekskul', icon: 'fa-hand-fist', warnaBg: 'linear-gradient(135deg,#166534,#22c55e)', ukuran: 'lebar', aktif: true },
      { judul: 'Drum Band', keterangan: 'Penampilan tim drum band pada upacara milad sekolah.', kategori: 'ekskul', icon: 'fa-drum', warnaBg: 'linear-gradient(135deg,#166534,#4ade80)', ukuran: 'normal', aktif: true },
      { judul: 'Market Day', keterangan: 'Proyek kewirausahaan siswa kelas V.', kategori: 'event', icon: 'fa-store', warnaBg: 'linear-gradient(135deg,#9a6700,#c8972a)', ukuran: 'besar', aktif: true },
      { judul: 'Wisuda Tahfiz', keterangan: 'Apresiasi capaian hafalan siswa program tahfiz.', kategori: 'event', icon: 'fa-star-and-crescent', warnaBg: 'linear-gradient(135deg,#9a6700,#eab308)', ukuran: 'normal', aktif: true },
      { judul: 'Kunjungan Perpustakaan', keterangan: 'Kegiatan membaca terarah di perpustakaan daerah.', kategori: 'akademik', icon: 'fa-book', warnaBg: 'linear-gradient(135deg,#0f2557,#1d4ed8)', ukuran: 'normal', aktif: true },
      { judul: 'Pentas Seni', keterangan: 'Penampilan tari dan musik tradisional akhir semester.', kategori: 'event', icon: 'fa-masks-theater', warnaBg: 'linear-gradient(135deg,#9a6700,#c8972a)', ukuran: 'lebar', aktif: true },
    ],
  })

  await prisma.dokumen.createMany({
    data: [
      {
        nama: 'Panduan PPDB 2026/2027',
        ukuran: '24 KB',
        tanggal: '2026-01-10',
        tipe: 'TXT',
        icon: 'fa-file-lines',
        warnaIcon: '#0f2557',
        warnaBg: '#eff6ff',
        keyword: 'ppdb panduan penerimaan siswa baru',
        url: '/file.svg',
        aktif: true,
      },
      {
        nama: 'Kalender Akademik Semester Genap',
        ukuran: '18 KB',
        tanggal: '2026-01-05',
        tipe: 'TXT',
        icon: 'fa-file-lines',
        warnaIcon: '#0f2557',
        warnaBg: '#eff6ff',
        keyword: 'kalender akademik semester jadwal',
        url: '/globe.svg',
        aktif: true,
      },
      {
        nama: 'Tata Tertib Peserta Didik',
        ukuran: '16 KB',
        tanggal: '2025-07-15',
        tipe: 'TXT',
        icon: 'fa-file-lines',
        warnaIcon: '#0f2557',
        warnaBg: '#eff6ff',
        keyword: 'tata tertib siswa aturan',
        url: '/window.svg',
        aktif: true,
      },
      {
        nama: 'Template Surat Izin Sakit',
        ukuran: '12 KB',
        tanggal: '2026-02-01',
        tipe: 'TXT',
        icon: 'fa-file-lines',
        warnaIcon: '#0f2557',
        warnaBg: '#eff6ff',
        keyword: 'template surat izin sakit',
        url: '/next.svg',
        aktif: true,
      },
      {
        nama: 'Daftar Ulang PPDB Gelombang 1',
        ukuran: '9 KB',
        tanggal: '2026-05-18',
        tipe: 'TXT',
        icon: 'fa-file-lines',
        warnaIcon: '#0f2557',
        warnaBg: '#eff6ff',
        keyword: 'daftar ulang ppdb gelombang 1',
        url: '/vercel.svg',
        aktif: true,
      },
    ],
  })

  await prisma.pendaftarPPDB.createMany({
    data: [
      { namaLengkap: 'Aqila Putri Ramadhani', nisn: '0123456789', tanggalLahir: '2019-03-17', asalSekolah: 'TK ABA 04 Kisaran', namaOrtu: 'Budi Ramadhan', teleponOrtu: '081234567801', jalur: 'reguler', status: 'pending', catatan: 'Menunggu verifikasi berkas.' },
      { namaLengkap: 'Muhammad Alfatih', nisn: '0123456790', tanggalLahir: '2018-11-01', asalSekolah: 'TK Islam Permata', namaOrtu: 'Sulastri', teleponOrtu: '081234567802', jalur: 'prestasi', status: 'diterima', catatan: 'Juara lomba mewarnai tingkat kecamatan.' },
      { namaLengkap: 'Nabila Azzahra', nisn: '0123456791', tanggalLahir: '2019-02-09', asalSekolah: 'TK ABA 02 Air Joman', namaOrtu: 'Rudi Hartono', teleponOrtu: '081234567803', jalur: 'afirmasi', status: 'pending', catatan: 'Melampirkan kartu bantuan sosial.' },
      { namaLengkap: 'Fathan Arsyad', nisn: '0123456792', tanggalLahir: '2018-08-23', asalSekolah: 'TK Bina Cendekia', namaOrtu: 'Sri Wahyuni', teleponOrtu: '081234567804', jalur: 'reguler', status: 'ditolak', catatan: 'Data usia belum memenuhi syarat minimal.' },
      { namaLengkap: 'Aisyah Humaira', nisn: '0123456793', tanggalLahir: '2019-01-12', asalSekolah: 'RA Aisyiyah Sijabut', namaOrtu: 'M. Yusuf', teleponOrtu: '081234567805', jalur: 'prestasi', status: 'diterima', catatan: 'Juara tahfiz anak tingkat kecamatan.' },
      { namaLengkap: 'Rafa Adyatma', nisn: '0123456794', tanggalLahir: '2018-10-28', asalSekolah: 'TK Pertiwi', namaOrtu: 'Fitri Handayani', teleponOrtu: '081234567806', jalur: 'reguler', status: 'pending', catatan: 'Jadwal wawancara orang tua 22 Maret 2026.' },
      { namaLengkap: 'Khalisha Maulina', nisn: '0123456795', tanggalLahir: '2019-06-05', asalSekolah: 'TK Smart Kid', namaOrtu: 'Aminah', teleponOrtu: '081234567807', jalur: 'afirmasi', status: 'diterima', catatan: 'Berkas lengkap dan sesuai kuota afirmasi.' },
      { namaLengkap: 'Abdullah Ziyad', nisn: '0123456796', tanggalLahir: '2019-04-15', asalSekolah: 'TK ABA 05 Kisaran', namaOrtu: 'Rahmad Hidayat', teleponOrtu: '081234567808', jalur: 'reguler', status: 'pending', catatan: 'Menunggu hasil observasi kesiapan sekolah.' },
    ],
  })

  console.log('Seed selesai.')
  console.log('Login admin: admin@sekolah.sch.id / admin123')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
