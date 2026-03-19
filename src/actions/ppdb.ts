'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth'

export async function submitPpdb(data: {
  namaLengkap: string
  nisn: string
  tanggalLahir: string
  asalSekolah: string
  namaOrtu: string
  teleponOrtu: string
  jalur: string
}) {
  try {
    if (!data.namaLengkap || !data.tanggalLahir || !data.namaOrtu || !data.teleponOrtu || !data.jalur) {
      return { success: false, error: 'Mohon lengkapi semua field wajib.' }
    }

    if (!['reguler', 'prestasi', 'afirmasi'].includes(data.jalur)) {
      return { success: false, error: 'Jalur pendaftaran tidak valid.' }
    }

    const pendaftar = await prisma.pendaftarPPDB.create({
      data: {
        namaLengkap: data.namaLengkap.trim(),
        nisn: data.nisn?.trim() || null,
        tanggalLahir: data.tanggalLahir,
        asalSekolah: data.asalSekolah?.trim() || null,
        namaOrtu: data.namaOrtu.trim(),
        teleponOrtu: data.teleponOrtu.trim(),
        jalur: data.jalur,
        status: 'pending',
      },
    })
    revalidatePath('/admin/ppdb')
    return { success: true, id: pendaftar.id }
  } catch (error) {
    console.error('Error submitting PPDB:', error)
    return { success: false, error: 'Terjadi kesalahan saat menyimpan data.' }
  }
}

export async function updateStatusPpdb(id: number, formData: FormData) {
  await requireAdmin()
  const status = String(formData.get('status') ?? '')
  if (['pending', 'diterima', 'ditolak'].includes(status)) {
    await prisma.pendaftarPPDB.update({
      where: { id },
      data: { status },
    })
    revalidatePath('/admin/ppdb')
  }
}
