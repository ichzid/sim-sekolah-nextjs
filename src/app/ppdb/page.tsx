import type { Metadata } from 'next'
import { getInfoSekolah } from '@/lib/cache'
import PpdbClient from './PpdbClient'

export const metadata: Metadata = {
  title: 'Pendaftaran PPDB',
}

// ISR: revalidate every 60 seconds
export const revalidate = 60

export default async function PPDBPage() {
  const info = await getInfoSekolah()
  const infoSekolah = info || { nama: 'SD Muhammadiyah' }
  
  return <PpdbClient infoSekolah={infoSekolah} />
}
