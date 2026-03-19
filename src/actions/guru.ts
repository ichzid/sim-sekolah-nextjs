'use server'

import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getGuru() {
  return prisma.guru.findMany({ where: { aktif: true }, orderBy: { id: 'asc' } })
}

export async function tambahGuru(formData: FormData) {
  await requireAdmin()
  const kategori = formData.get('kategori') as string
  const warnaMap: Record<string, string> = {
    pimpinan: 'linear-gradient(135deg,#0f2557,#1a3a80)',
    guru: 'linear-gradient(135deg,#0369a1,#0ea5e9)',
    staf: 'linear-gradient(135deg,#374151,#6b7280)',
  }
  await prisma.guru.create({
    data: {
      nama: formData.get('nama') as string,
      jabatan: formData.get('jabatan') as string,
      mapel: formData.get('mapel') as string,
      pendidikan: formData.get('pendidikan') as string,
      pengalaman: (formData.get('pengalaman') as string) || '-',
      kategori,
      warnaBg: warnaMap[kategori] ?? warnaMap.guru,
    },
  })
  revalidatePath('/guru-staf')
  revalidatePath('/admin/guru')
  redirect('/admin/guru')
}

export async function hapusGuru(id: number) {
  await requireAdmin()
  await prisma.guru.update({ where: { id }, data: { aktif: false } })
  revalidatePath('/guru-staf')
  revalidatePath('/admin/guru')
}

export async function updateGuru(id: number, formData: FormData) {
  await requireAdmin()
  const kategori = formData.get('kategori') as string
  const warnaMap: Record<string, string> = {
    pimpinan: 'linear-gradient(135deg,#0f2557,#1a3a80)',
    guru: 'linear-gradient(135deg,#0369a1,#0ea5e9)',
    staf: 'linear-gradient(135deg,#374151,#6b7280)',
  }
  await prisma.guru.update({
    where: { id },
    data: {
      nama: formData.get('nama') as string,
      jabatan: formData.get('jabatan') as string,
      mapel: formData.get('mapel') as string,
      pendidikan: formData.get('pendidikan') as string,
      pengalaman: (formData.get('pengalaman') as string) || '-',
      kategori,
      warnaBg: warnaMap[kategori] ?? warnaMap.guru,
    },
  })
  revalidatePath('/guru-staf')
  revalidatePath('/admin/guru')
  redirect('/admin/guru')
}
