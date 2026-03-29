'use server'

import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'
import { parsePrestasiTextarea, parseStatistikTextarea, parseTextareaLines } from '@/lib/info-sekolah'
import { revalidatePath } from 'next/cache'

export async function getInfoSekolah() {
  return prisma.infoSekolah.findFirst()
}

export async function updateInfoSekolah(formData: FormData) {
  await requireAdmin()
  const misi = parseTextareaLines(formData.get('misi'))
  const statistikSekolah = parseStatistikTextarea(formData.get('statistikSekolah'))
  const prestasiSekolah = parsePrestasiTextarea(formData.get('prestasiSekolah'))

  const existing = await prisma.infoSekolah.findFirst()
  const data = {
    nama: formData.get('nama') as string,
    singkatan: (formData.get('singkatan') as string) || '',
    npsn: (formData.get('npsn') as string) || '',
    akreditasi: (formData.get('akreditasi') as string) || 'A',
    tahunBerdiri: (formData.get('tahunBerdiri') as string) || '',
    kepalaSekolah: (formData.get('kepalaSekolah') as string) || '',
    alamat: (formData.get('alamat') as string) || '',
    kota: (formData.get('kota') as string) || '',
    kodePos: (formData.get('kodePos') as string) || '',
    telepon: (formData.get('telepon') as string) || '',
    email: (formData.get('email') as string) || '',
    website: (formData.get('website') as string) || '',
    jamOperasional: (formData.get('jamOperasional') as string) || '',
    googleMapsUrl: (formData.get('googleMapsUrl') as string) || 'https://maps.google.com',
    facebookUrl: (formData.get('facebookUrl') as string) || '#',
    instagramUrl: (formData.get('instagramUrl') as string) || '#',
    youtubeUrl: (formData.get('youtubeUrl') as string) || '#',
    whatsappUrl: (formData.get('whatsappUrl') as string) || '#',
    visi: (formData.get('visi') as string) || '',
    misi: JSON.stringify(misi),
    statistikSekolah: JSON.stringify(statistikSekolah),
    prestasiSekolah: JSON.stringify(prestasiSekolah),
    sambutanKepalaSekolah: (formData.get('sambutanKepalaSekolah') as string) || '',
    heroBackgroundUrl: (formData.get('heroBackgroundUrl') as string) || '',
    motto: (formData.get('motto') as string) || '',
  }

  if (existing) {
    await prisma.infoSekolah.update({ where: { id: existing.id }, data })
  } else {
    await prisma.infoSekolah.create({ data })
  }

  revalidatePath('/')
  revalidatePath('/profil')
  revalidatePath('/kontak')
  revalidatePath('/admin/info-sekolah')
}

export async function getStatistik() {
  const [totalBerita, totalGuru, totalPendaftar] = await Promise.all([
    prisma.berita.count({ where: { tipe: 'berita' } }),
    prisma.guru.count({ where: { aktif: true } }),
    prisma.pendaftarPPDB.count(),
  ])
  return { totalBerita, totalGuru, totalPendaftar }
}
