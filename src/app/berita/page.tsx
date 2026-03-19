import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import BeritaClient from './BeritaClient'

export const metadata: Metadata = {
  title: 'Berita & Pengumuman',
}

export default async function BeritaPage() {
  const info = await prisma.infoSekolah.findFirst()
  const infoSekolah = info || { nama: 'SD Muhammadiyah' }

  const dataBerita = await prisma.berita.findMany({
    where: { tipe: 'berita', published: true, slug: { not: null } },
    orderBy: { createdAt: 'desc' }
  })

  const dataPengumuman = await prisma.berita.findMany({
    where: { tipe: 'pengumuman', published: true, slug: { not: null } },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <BeritaClient 
      dataBerita={dataBerita} 
      dataPengumuman={dataPengumuman} 
      infoSekolah={infoSekolah} 
    />
  )
}
