# SIM Sekolah Next.js - Sistem Informasi Sekolah

SIM Sekolah Next.js adalah sistem informasi sekolah yang dirancang untuk membantu pengelolaan website sekolah dan panel admin dalam satu aplikasi yang terintegrasi.

Sistem ini mendukung kebutuhan publikasi profil sekolah, berita, pengumuman, galeri, dokumen unduhan, data guru dan staf, serta pengelolaan PPDB melalui dashboard admin yang terstruktur dan mudah digunakan.

---

## Fitur Utama

- Website publik sekolah dengan halaman beranda, profil, guru dan staf, berita, galeri, unduhan, PPDB, dan kontak.
- Dashboard admin untuk mengelola konten sekolah secara langsung dari satu panel.
- CRUD berita dan pengumuman lengkap dengan slug URL untuk halaman detail.
- CRUD data guru dan tenaga kependidikan.
- CRUD galeri sekolah untuk menampilkan kegiatan akademik, ekstrakurikuler, dan event.
- CRUD dokumen unduhan untuk kebutuhan informasi dan administrasi sekolah.
- Manajemen informasi sekolah seperti identitas sekolah, visi, misi, motto, sambutan kepala sekolah, statistik, prestasi, sosial media, dan jam operasional.
- Data profil kepala sekolah yang dapat ditampilkan secara dinamis dari database.
- Monitoring data pendaftar PPDB melalui halaman admin.
- Tampilan frontend responsif untuk desktop dan mobile.

---

## Modul Sistem

- Beranda
- Profil Sekolah
- Guru & Staf
- Berita & Pengumuman
- Galeri
- Unduhan
- PPDB
- Kontak
- Login Admin
- Dashboard Admin
- Kelola Info Sekolah
- Kelola Guru
- Kelola Berita
- Kelola Galeri
- Kelola Dokumen
- Monitoring PPDB

---

## Tech Stack

- Framework: Next.js 16
- Frontend: React 19
- Styling: Tailwind CSS 4
- Backend: Next.js App Router + Server Actions
- Database ORM: Prisma
- Database Lokal: SQLite
- Authentication: Custom session auth dengan cookie signed

---

## Cara Menjalankan Secara Lokal

### 1. Clone repo ini

```bash
git clone https://github.com/ichzid/sim-sekolah-nextjs.git
cd sim-sekolah-nextjs
```

### 2. Install dependensi

```bash
npm install
```

### 3. Buat file environment

Buat file `.env` lalu isi seperti berikut:

```env
DATABASE_URL="file:./dev.db"
SESSION_SECRET="ganti-dengan-secret-yang-aman"
```

### 4. Generate Prisma client dan siapkan database

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

### 5. Jalankan aplikasi

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`.

---

## Akun Demo Seeder

Setelah menjalankan `npm run db:seed`, akun admin default yang tersedia adalah:

```txt
Email    : admin@sekolah.sch.id
Password : admin123
```

---

## Catatan Penggunaan

- Halaman publik membaca data sekolah langsung dari database.
- Informasi sekolah seperti sosial media, jam operasional, statistik, prestasi, dan sambutan kepala sekolah dapat diubah dari panel admin.
- Berita dan pengumuman memiliki halaman detail publik dengan URL berbasis slug.
- Proyek ini menggunakan SQLite untuk pengembangan lokal, sehingga tidak perlu instalasi database server terpisah.
- Jika schema Prisma berubah, jalankan kembali `npx prisma generate` dan `npx prisma db push`.

---

## Pengembangan Lanjutan

Proyek ini terbuka untuk pengembangan lanjutan. Beberapa area yang masih dapat dikembangkan lebih lanjut antara lain:

- Pengaturan PPDB yang sepenuhnya dinamis dari panel admin.
- Upload file dan gambar nyata untuk galeri dan dokumen.
- Integrasi email atau formulir kontak yang benar-benar mengirim pesan.
- Role pengguna yang lebih lengkap selain admin tunggal.
- Optimasi SEO dan metadata untuk setiap halaman publik.

---

## Dukung Pengembangan

Jika proyek ini bermanfaat dan Anda ingin mendukung pengembangan selanjutnya, Anda dapat memberikan dukungan melalui Saweria:

https://saweria.co/ichzid

CTA:
Jika proyek ini membantu, silakan dukung pengembangannya lewat Saweria agar fitur-fitur berikutnya bisa terus dikembangkan.

---

Dibuat untuk membantu sekolah mengelola website publik dan administrasi konten secara lebih rapi, modern, dan terintegrasi.
