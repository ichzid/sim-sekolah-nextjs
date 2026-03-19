import { prisma } from '@/lib/db'
import KontakClient from './KontakClient'

export default async function KontakPage() {
  const info = await prisma.infoSekolah.findFirst()
  const infoSekolah = {
    nama: info?.nama || 'SD Muhammadiyah Danau Sijabut',
    alamat: info?.alamat || 'Jl. Pendidikan No. 1',
    kota: info?.kota || 'Kabupaten Asahan',
    kodePos: info?.kodePos || '21252',
    telepon: info?.telepon || '(0623) 555-0001',
    email: info?.email || 'info@sekolah.sch.id',
    website: info?.website || 'www.sekolah.sch.id',
    jamOperasional: info?.jamOperasional || 'Senin-Jumat: 07.00-15.00 WIB',
    googleMapsUrl: info?.googleMapsUrl || 'https://maps.google.com',
    facebookUrl: info?.facebookUrl || '#',
    instagramUrl: info?.instagramUrl || '#',
    youtubeUrl: info?.youtubeUrl || '#',
    whatsappUrl: info?.whatsappUrl || '#',
  }

  return <KontakClient infoSekolah={infoSekolah} />
}
