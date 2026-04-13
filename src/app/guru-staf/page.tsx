import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import GuruClient from './GuruClient'

export const metadata: Metadata = {
  title: 'Guru & Staf',
}

// ISR: revalidate every 60 seconds
export const revalidate = 60

export default async function GuruStafPage() {
  const dataGuru = await prisma.guru.findMany({
    where: { aktif: true },
    orderBy: { id: 'asc' }
  })
  return <GuruClient dataGuru={dataGuru} />
}
