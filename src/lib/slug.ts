import type { PrismaClient } from '@prisma/client'

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .replace(/-{2,}/g, '-')
}

export async function generateUniqueBeritaSlug(
  db: PrismaClient,
  judul: string,
  excludeId?: number
) {
  const baseSlug = slugify(judul) || 'berita'
  let slug = baseSlug
  let counter = 2

  while (true) {
    const existing = await db.berita.findFirst({
      where: {
        slug,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
      select: { id: true },
    })

    if (!existing) {
      return slug
    }

    slug = `${baseSlug}-${counter}`
    counter += 1
  }
}
