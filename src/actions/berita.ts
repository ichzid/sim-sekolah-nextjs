'use server'

import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { normalizeTanggalInput } from '@/lib/format'
import { generateUniqueBeritaSlug } from '@/lib/slug'

export async function getBerita() {
  return prisma.berita.findMany({ orderBy: { createdAt: 'desc' } })
}

function getBeritaAppearance(tipe: string, prioritas: boolean) {
  if (tipe === 'pengumuman') {
    return prioritas
      ? {
          warnaBg: 'linear-gradient(135deg,#991b1b,#dc2626)',
          warnaKiri: '#dc2626',
          icon: 'fa-bullhorn',
        }
      : {
          warnaBg: 'linear-gradient(135deg,#9a6700,#c8972a)',
          warnaKiri: '#c8972a',
          icon: 'fa-bullhorn',
        }
  }

  return {
    warnaBg: 'linear-gradient(135deg,#0f2557,#2a5298)',
    warnaKiri: '#0f2557',
    icon: 'fa-newspaper',
  }
}

export async function tambahBerita(formData: FormData) {
  await requireAdmin()
  const judul = String(formData.get('judul') ?? '').trim()
  const prioritas = formData.get('prioritas') === 'true'
  const tipe = String(formData.get('tipe') ?? 'berita')
  const appearance = getBeritaAppearance(tipe, prioritas)
  const slug = await generateUniqueBeritaSlug(prisma, judul)

  await prisma.berita.create({
    data: {
      slug,
      judul,
      ringkasan: String(formData.get('ringkasan') ?? '').trim(),
      isi: String(formData.get('isi') ?? '').trim(),
      kategori: String(formData.get('kategori') ?? '').trim(),
      tanggal: normalizeTanggalInput(formData.get('tanggal')),
      tipe,
      prioritas,
      warnaBg: appearance.warnaBg,
      warnaKiri: appearance.warnaKiri,
      icon: appearance.icon,
      published: formData.get('published') === 'true',
    },
  })
  revalidatePath('/berita')
  revalidatePath('/')
  revalidatePath('/admin/berita')
  redirect('/admin/berita')
}

export async function hapusBerita(id: number) {
  await requireAdmin()
  await prisma.berita.delete({ where: { id } })
  revalidatePath('/berita')
  revalidatePath('/admin/berita')
}

export async function updateBerita(id: number, formData: FormData) {
  await requireAdmin()
  const judul = String(formData.get('judul') ?? '').trim()
  const prioritas = formData.get('prioritas') === 'true'
  const tipe = String(formData.get('tipe') ?? 'berita')
  const appearance = getBeritaAppearance(tipe, prioritas)
  const existing = await prisma.berita.findUnique({
    where: { id },
    select: { slug: true },
  })
  const slug = await generateUniqueBeritaSlug(prisma, judul, id)

  await prisma.berita.update({
    where: { id },
    data: {
      slug,
      judul,
      ringkasan: String(formData.get('ringkasan') ?? '').trim(),
      isi: String(formData.get('isi') ?? '').trim(),
      kategori: String(formData.get('kategori') ?? '').trim(),
      tanggal: normalizeTanggalInput(formData.get('tanggal')),
      tipe,
      prioritas,
      warnaBg: appearance.warnaBg,
      warnaKiri: appearance.warnaKiri,
      icon: appearance.icon,
      published: formData.get('published') === 'true',
    },
  })
  revalidatePath('/berita')
  revalidatePath('/')
  revalidatePath('/admin/berita')
  if (existing?.slug) {
    revalidatePath(`/berita/${existing.slug}`)
  }
  revalidatePath(`/berita/${slug}`)
  redirect('/admin/berita')
}
