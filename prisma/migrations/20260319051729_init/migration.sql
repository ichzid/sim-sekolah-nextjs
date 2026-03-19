-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "InfoSekolah" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "singkatan" TEXT NOT NULL,
    "npsn" TEXT NOT NULL,
    "akreditasi" TEXT NOT NULL,
    "tahunBerdiri" TEXT NOT NULL,
    "kepalaSekolah" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "kota" TEXT NOT NULL,
    "kodePos" TEXT NOT NULL,
    "telepon" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "visi" TEXT NOT NULL,
    "misi" TEXT NOT NULL,
    "motto" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Berita" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "judul" TEXT NOT NULL,
    "ringkasan" TEXT NOT NULL,
    "isi" TEXT NOT NULL DEFAULT '',
    "kategori" TEXT NOT NULL,
    "tanggal" TEXT NOT NULL,
    "tipe" TEXT NOT NULL,
    "prioritas" BOOLEAN NOT NULL DEFAULT false,
    "warnaBg" TEXT,
    "warnaKiri" TEXT,
    "icon" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Guru" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "mapel" TEXT NOT NULL,
    "pendidikan" TEXT NOT NULL,
    "pengalaman" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "warnaBg" TEXT NOT NULL,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ItemGaleri" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "judul" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "warnaBg" TEXT NOT NULL,
    "ukuran" TEXT NOT NULL DEFAULT 'normal',
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Dokumen" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "ukuran" TEXT NOT NULL,
    "tanggal" TEXT NOT NULL,
    "tipe" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "warnaIcon" TEXT NOT NULL,
    "warnaBg" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "url" TEXT NOT NULL DEFAULT '#',
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PendaftarPPDB" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "namaLengkap" TEXT NOT NULL,
    "nisn" TEXT,
    "tanggalLahir" TEXT NOT NULL,
    "asalSekolah" TEXT,
    "namaOrtu" TEXT NOT NULL,
    "teleponOrtu" TEXT NOT NULL,
    "jalur" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "catatan" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
