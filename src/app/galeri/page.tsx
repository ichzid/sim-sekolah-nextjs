import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import GaleriClient from './GaleriClient'

export const metadata: Metadata = {
  title: 'Galeri Foto',
}

// ISR: revalidate every 60 seconds
export const revalidate = 60

export default async function GaleriPage() {
  const dataGaleri = await prisma.itemGaleri.findMany({
    where: { aktif: true },
    orderBy: { createdAt: 'desc' }
  })
  
  return <GaleriClient dataGaleri={dataGaleri} />
}
