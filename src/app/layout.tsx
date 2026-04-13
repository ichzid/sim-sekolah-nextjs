import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import { getInfoSekolah } from '@/lib/cache'
import ClientLayoutWrapper from '@/components/layout/ClientLayoutWrapper'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-playfair',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
})

export async function generateMetadata(): Promise<Metadata> {
  const info = await getInfoSekolah()
  const nama = info?.nama || 'SD Muhammadiyah Danau Sijabut'
  const motto = info?.motto || 'Cerdas, Berakhlak, Berprestasi'
  const akreditasi = info?.akreditasi || 'A'

  return {
    title: {
      default: nama,
      template: `%s | ${nama}`,
    },
    description: `Website resmi ${nama}. ${motto}. Terakreditasi ${akreditasi}.`,
    keywords: ['sekolah dasar', 'muhammadiyah', 'danau sijabut', 'asahan', 'SD', 'pendidikan Islam'],
    authors: [{ name: nama }],
    openGraph: {
      title: nama,
      description: motto,
      type: 'website',
      locale: 'id_ID',
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const info = await getInfoSekolah()
  const infoData = {
    nama: info?.nama || 'SD Muhammadiyah',
    singkatan: info?.singkatan || 'Danau Sijabut',
    tahunBerdiri: info?.tahunBerdiri || '1980',
    akreditasi: info?.akreditasi || 'A',
    motto: info?.motto || 'Cerdas, Berakhlak, Berprestasi',
    alamat: info?.alamat || 'Jl. Pendidikan No. 1',
    kota: info?.kota || 'Kabupaten Asahan',
    telepon: info?.telepon || '(0623) 555-0001',
    email: info?.email || 'info@sekolah.sch.id',
    jamOperasional: info?.jamOperasional || 'Senin-Jumat: 07.00-15.00 WIB',
    facebookUrl: info?.facebookUrl || '#',
    instagramUrl: info?.instagramUrl || '#',
    youtubeUrl: info?.youtubeUrl || '#',
    whatsappUrl: info?.whatsappUrl || '#',
  }

  return (
    <html lang="id" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body className="antialiased">
        <ClientLayoutWrapper info={infoData}>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  )
}
