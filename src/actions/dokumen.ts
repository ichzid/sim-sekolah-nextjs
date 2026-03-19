'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'
import { normalizeTanggalInput } from '@/lib/format'

function getDokumenAppearance(tipeRaw: string) {
  const tipe = tipeRaw.trim().toUpperCase()

  switch (tipe) {
    case 'PDF':
      return {
        tipe,
        icon: 'fa-file-pdf',
        warnaIcon: '#ef4444',
        warnaBg: '#fef2f2',
      }
    case 'DOC':
    case 'DOCX':
      return {
        tipe,
        icon: 'fa-file-word',
        warnaIcon: '#2563eb',
        warnaBg: '#eff6ff',
      }
    case 'XLS':
    case 'XLSX':
      return {
        tipe,
        icon: 'fa-file-excel',
        warnaIcon: '#16a34a',
        warnaBg: '#f0fdf4',
      }
    default:
      return {
        tipe: tipe || 'FILE',
        icon: 'fa-file-lines',
        warnaIcon: '#0f2557',
        warnaBg: '#eff6ff',
      }
  }
}

export async function getDokumen() {
  return prisma.dokumen.findMany({
    where: { aktif: true },
    orderBy: [{ tanggal: 'desc' }, { createdAt: 'desc' }],
  })
}

export async function tambahDokumen(formData: FormData) {
  await requireAdmin()
  const appearance = getDokumenAppearance(String(formData.get('tipe') ?? 'PDF'))

  await prisma.dokumen.create({
    data: {
      nama: String(formData.get('nama') ?? '').trim(),
      ukuran: String(formData.get('ukuran') ?? '').trim(),
      tanggal: normalizeTanggalInput(formData.get('tanggal')),
      tipe: appearance.tipe,
      icon: appearance.icon,
      warnaIcon: appearance.warnaIcon,
      warnaBg: appearance.warnaBg,
      keyword: String(formData.get('keyword') ?? '').trim(),
      url: String(formData.get('url') ?? '').trim() || '#',
      aktif: true,
    },
  })

  revalidatePath('/unduhan')
  revalidatePath('/admin/dokumen')
  redirect('/admin/dokumen')
}

export async function updateDokumen(id: number, formData: FormData) {
  await requireAdmin()
  const appearance = getDokumenAppearance(String(formData.get('tipe') ?? 'PDF'))

  await prisma.dokumen.update({
    where: { id },
    data: {
      nama: String(formData.get('nama') ?? '').trim(),
      ukuran: String(formData.get('ukuran') ?? '').trim(),
      tanggal: normalizeTanggalInput(formData.get('tanggal')),
      tipe: appearance.tipe,
      icon: appearance.icon,
      warnaIcon: appearance.warnaIcon,
      warnaBg: appearance.warnaBg,
      keyword: String(formData.get('keyword') ?? '').trim(),
      url: String(formData.get('url') ?? '').trim() || '#',
    },
  })

  revalidatePath('/unduhan')
  revalidatePath('/admin/dokumen')
  redirect('/admin/dokumen')
}

export async function hapusDokumen(id: number) {
  await requireAdmin()
  await prisma.dokumen.update({
    where: { id },
    data: { aktif: false },
  })

  revalidatePath('/unduhan')
  revalidatePath('/admin/dokumen')
}
