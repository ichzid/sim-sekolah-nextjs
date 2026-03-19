import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { parseJsonArray } from '@/lib/info-sekolah'
import ProfilClient from './ProfilClient'

export const metadata: Metadata = {
  title: 'Profil',
}

export default async function ProfilPage() {
  const info = await prisma.infoSekolah.findFirst()
  const kepalaSekolahGuru =
    (await prisma.guru.findFirst({
      where: {
        aktif: true,
        jabatan: {
          contains: 'Kepala Sekolah',
        },
      },
    })) ||
    (info?.kepalaSekolah
      ? await prisma.guru.findFirst({
          where: {
            aktif: true,
            nama: info.kepalaSekolah,
          },
        })
      : null)

  const infoSekolah = info || {
    nama: 'SD Muhammadiyah Danau Sijabut',
    tahunBerdiri: '1980',
    visi: 'Visi sekolah',
    misi: '[]',
    prestasiSekolah: '[]',
    kepalaSekolah: 'Kepala Sekolah',
    sambutanKepalaSekolah: '',
  }
  const prestasiSekolah = parseJsonArray<{ icon: string; judul: string; keterangan: string }>(
    infoSekolah.prestasiSekolah
  )

  const kepalaSekolah = kepalaSekolahGuru
    ? {
        nama: kepalaSekolahGuru.nama,
        jabatan: kepalaSekolahGuru.jabatan,
        pendidikan: kepalaSekolahGuru.pendidikan,
        pengalaman: kepalaSekolahGuru.pengalaman,
      }
    : {
        nama: infoSekolah.kepalaSekolah,
        jabatan: 'Kepala Sekolah',
        pendidikan: '-',
        pengalaman: '-',
      }

  return <ProfilClient infoSekolah={infoSekolah} kepalaSekolah={kepalaSekolah} prestasiSekolah={prestasiSekolah} />
}
