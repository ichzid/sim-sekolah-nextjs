import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { getInfoSekolah } from '@/lib/cache'
import { parseJsonArray } from '@/lib/info-sekolah'
import ProfilClient from './ProfilClient'

export const metadata: Metadata = {
  title: 'Profil',
}

// ISR: revalidate every 60 seconds
export const revalidate = 60

export default async function ProfilPage() {
  const info = await getInfoSekolah()

  // Try finding by jabatan first, then by nama from info
  const kepalaSekolahGuru = info?.kepalaSekolah
    ? await prisma.guru.findFirst({
        where: {
          aktif: true,
          OR: [
            { jabatan: 'Kepala Sekolah' },
            { nama: info.kepalaSekolah },
          ],
        },
      })
    : await prisma.guru.findFirst({
        where: { aktif: true, jabatan: 'Kepala Sekolah' },
      })

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
        fotoUrl: kepalaSekolahGuru.fotoUrl,
      }
    : {
        nama: infoSekolah.kepalaSekolah,
        jabatan: 'Kepala Sekolah',
        pendidikan: '-',
        pengalaman: '-',
        fotoUrl: null,
      }

  return <ProfilClient infoSekolah={infoSekolah} kepalaSekolah={kepalaSekolah} prestasiSekolah={prestasiSekolah} />
}
