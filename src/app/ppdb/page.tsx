import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import PpdbClient from './PpdbClient'

export const metadata: Metadata = {
  title: 'Pendaftaran PPDB',
}

export default async function PPDBPage() {
  const info = await prisma.infoSekolah.findFirst()
  const infoSekolah = info || { nama: 'SD Muhammadiyah' }
  
  return <PpdbClient infoSekolah={infoSekolah} />
}
