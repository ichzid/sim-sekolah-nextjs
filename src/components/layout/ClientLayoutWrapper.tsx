'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/ui/ScrollToTop'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
      <ToastContainer 
        position="top-right" 
        autoClose={3500} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="colored"
        toastStyle={{ backgroundColor: '#0f2557', color: 'white', borderRadius: '12px' }}
      />
      {!isAdmin && <Navbar info={info} />}
      <main>{children}</main>
      {!isAdmin && <Footer infoSekolah={info} />}
      {!isAdmin && <ScrollToTop />}
    </>
  )
}
