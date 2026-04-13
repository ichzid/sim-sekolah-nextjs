import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { getInfoSekolah } from '@/lib/cache'
import BeritaClient from './BeritaClient'

export const metadata: Metadata = {
  title: 'Berita & Pengumuman',
}

// ISR: revalidate every 60 seconds
export const revalidate = 60

export default async function BeritaPage() {
  const [info, dataBerita, dataPengumuman] = await Promise.all([
    getInfoSekolah(),
    prisma.berita.findMany({
      where: { tipe: 'berita', published: true, slug: { not: null } },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.berita.findMany({
      where: { tipe: 'pengumuman', published: true, slug: { not: null } },
      orderBy: { createdAt: 'desc' },
    }),
  ])
  const infoSekolah = info || { nama: 'SD Muhammadiyah' }

  return (
    <BeritaClient 
      dataBerita={dataBerita} 
      dataPengumuman={dataPengumuman} 
      infoSekolah={infoSekolah} 
    />
  )
}
