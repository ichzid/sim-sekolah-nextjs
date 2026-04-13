import { cache } from 'react'
import { prisma } from '@/lib/db'

/**
 * Cached version of infoSekolah.findFirst()
 * React cache() deduplicates identical calls within a single render pass,
 * so layout.tsx, generateMetadata, and page.tsx sharing this won't re-query.
 */
export const getInfoSekolah = cache(async () => {
  return prisma.infoSekolah.findFirst()
})