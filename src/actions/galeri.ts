'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'

function getGaleriAppearance(kategori: string) {
  switch (kategori) {
    case 'akademik':
      return {
        icon: 'fa-book-open',
        warnaBg: 'linear-gradient(135deg,#0f2557,#1d4ed8)',
      }
    case 'ekskul':
      return {
        icon: 'fa-futbol',
        warnaBg: 'linear-gradient(135deg,#166534,#22c55e)',
      }
    default:
      return {
        icon: 'fa-calendar-star',
        warnaBg: 'linear-gradient(135deg,#9a6700,#c8972a)',
      }
  }
}

export async function getGaleri() {
  return prisma.itemGaleri.findMany({
    where: { aktif: true },
    orderBy: { createdAt: 'desc' },
  })
}

export async function tambahGaleri(formData: FormData) {
  await requireAdmin()
  const kategori = String(formData.get('kategori') ?? 'akademik')
  const appearance = getGaleriAppearance(kategori)

  await prisma.itemGaleri.create({
    data: {
      judul: String(formData.get('judul') ?? '').trim(),
      keterangan: String(formData.get('keterangan') ?? '').trim(),
      kategori,
      ukuran: String(formData.get('ukuran') ?? 'normal'),
      icon: String(formData.get('icon') ?? '').trim() || appearance.icon,
      warnaBg:
        String(formData.get('warnaBg') ?? '').trim() || appearance.warnaBg,
      aktif: true,
    },
  })

  revalidatePath('/galeri')
  revalidatePath('/admin/galeri')
  redirect('/admin/galeri')
}

export async function updateGaleri(id: number, formData: FormData) {
  await requireAdmin()
  const kategori = String(formData.get('kategori') ?? 'akademik')
  const appearance = getGaleriAppearance(kategori)

  await prisma.itemGaleri.update({
    where: { id },
    data: {
      judul: String(formData.get('judul') ?? '').trim(),
      keterangan: String(formData.get('keterangan') ?? '').trim(),
      kategori,
      ukuran: String(formData.get('ukuran') ?? 'normal'),
      icon: String(formData.get('icon') ?? '').trim() || appearance.icon,
      warnaBg:
        String(formData.get('warnaBg') ?? '').trim() || appearance.warnaBg,
    },
  })

  revalidatePath('/galeri')
  revalidatePath('/admin/galeri')
  redirect('/admin/galeri')
}

export async function hapusGaleri(id: number) {
  await requireAdmin()
  await prisma.itemGaleri.update({
    where: { id },
    data: { aktif: false },
  })

  revalidatePath('/galeri')
  revalidatePath('/admin/galeri')
}
