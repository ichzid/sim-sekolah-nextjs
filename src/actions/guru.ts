'use server'

import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'

async function uploadFoto(file: File | null) {
  if (!file || file.size === 0 || file.name === 'undefined') return null
  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`
    
    const { error } = await supabase.storage
      .from('guru-staf')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true
      })
      
    if (error) {
      console.error('Error upload:', error.message)
      return null
    }
    
    const { data } = supabase.storage
      .from('guru-staf')
      .getPublicUrl(fileName)
      
    return data.publicUrl
  } catch (e) {
    console.error('Failed to upload', e)
    return null
  }
}


export async function getGuru() {
  return prisma.guru.findMany({ where: { aktif: true }, orderBy: { id: 'asc' } })
}

export async function tambahGuru(formData: FormData) {
  await requireAdmin()
  const kategori = formData.get('kategori') as string
  const jabatan = (formData.get('jabatan') as string).trim()

  if (jabatan.toLowerCase() === 'kepala sekolah') {
    const isExist = await prisma.guru.findFirst({
      where: { aktif: true, jabatan: 'Kepala Sekolah' }
    })
    if (isExist) {
      redirect('/admin/guru?toast_error=Gagal!+Hanya+boleh+ada+1+Kepala+Sekolah+aktif')
    }
  }

  const warnaMap: Record<string, string> = {
    pimpinan: 'linear-gradient(135deg,#0f2557,#1a3a80)',
    guru: 'linear-gradient(135deg,#0369a1,#0ea5e9)',
    staf: 'linear-gradient(135deg,#374151,#6b7280)',
  }
  const file = formData.get('foto') as File | null
  const fotoUrl = await uploadFoto(file)

  await prisma.guru.create({
    data: {
      nama: formData.get('nama') as string,
      jabatan: formData.get('jabatan') as string,
      mapel: formData.get('mapel') as string,
      pendidikan: formData.get('pendidikan') as string,
      pengalaman: (formData.get('pengalaman') as string) || '-',
      kategori,
      warnaBg: warnaMap[kategori] ?? warnaMap.guru,
      fotoUrl,
    },
  })
  revalidatePath('/guru-staf')
  revalidatePath('/admin/guru')
  redirect('/admin/guru?toast_success=Data+berhasil+disimpan')
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
  const jabatan = (formData.get('jabatan') as string).trim()

  if (jabatan.toLowerCase() === 'kepala sekolah') {
    const isExist = await prisma.guru.findFirst({
      where: { 
        aktif: true, 
        jabatan: 'Kepala Sekolah',
        id: { not: id } 
      }
    })
    if (isExist) {
      redirect('/admin/guru?toast_error=Gagal!+Hanya+boleh+ada+1+Kepala+Sekolah+aktif')
    }
  }

  const warnaMap: Record<string, string> = {
    pimpinan: 'linear-gradient(135deg,#0f2557,#1a3a80)',
    guru: 'linear-gradient(135deg,#0369a1,#0ea5e9)',
    staf: 'linear-gradient(135deg,#374151,#6b7280)',
  }
  const file = formData.get('foto') as File | null
  const uploadedUrl = await uploadFoto(file)
  
  const updateData: any = {
    nama: formData.get('nama') as string,
    jabatan: formData.get('jabatan') as string,
    mapel: formData.get('mapel') as string,
    pendidikan: formData.get('pendidikan') as string,
    pengalaman: (formData.get('pengalaman') as string) || '-',
    kategori,
    warnaBg: warnaMap[kategori] ?? warnaMap.guru,
  }
  
  if (uploadedUrl) {
    updateData.fotoUrl = uploadedUrl
  }

  await prisma.guru.update({
    where: { id },
    data: updateData,
  })
  revalidatePath('/guru-staf')
  revalidatePath('/admin/guru')
  redirect('/admin/guru?toast_success=Data+berhasil+disimpan')
}
