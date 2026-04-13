import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import UnduhanClient from './UnduhanClient'

export const metadata: Metadata = {
  title: 'Unduhan Dokumen',
}

// ISR: revalidate every 60 seconds
export const revalidate = 60

export default async function UnduhanPage() {
  const dataDokumen = await prisma.dokumen.findMany({
    where: { aktif: true },
    orderBy: { tanggal: 'desc' }
  })
  
  return <UnduhanClient dataDokumen={dataDokumen} />
}
