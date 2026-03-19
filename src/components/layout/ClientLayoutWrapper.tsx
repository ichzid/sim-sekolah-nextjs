'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/ui/ScrollToTop'

export default function ClientLayoutWrapper({
  children,
  info
}: {
  children: React.ReactNode,
  info: {
    nama: string
    singkatan: string
    tahunBerdiri: string
    akreditasi: string
    motto: string
    alamat: string
    kota: string
    telepon: string
    email: string
    jamOperasional: string
    facebookUrl: string
    instagramUrl: string
    youtubeUrl: string
    whatsappUrl: string
  }
}) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <>
      {!isAdmin && <Navbar info={info} />}
      <main>{children}</main>
      {!isAdmin && <Footer infoSekolah={info} />}
      {!isAdmin && <ScrollToTop />}
    </>
  )
}
