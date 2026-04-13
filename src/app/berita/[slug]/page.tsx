import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { prisma } from '@/lib/db'
import { formatTanggalIndonesia } from '@/lib/format'

type PageProps = {
  params: Promise<{ slug: string }>
}

// Deduplicate the berita query across generateMetadata and page render
const getBeritaBySlug = cache(async (slug: string) => {
  return prisma.berita.findUnique({ where: { slug } })
})

// ISR: revalidate every 60 seconds
export const revalidate = 60

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const berita = await getBeritaBySlug(slug)

  if (!berita || !berita.published) {
    return { title: 'Detail Berita' }
  }

  return {
    title: berita.judul,
    description: berita.ringkasan,
  }
}

export default async function DetailBeritaPage({ params }: PageProps) {
  const { slug } = await params
  const berita = await getBeritaBySlug(slug)

  if (!berita || !berita.published) notFound()

  const lainnya = await prisma.berita.findMany({
    where: {
      published: true,
      id: { not: berita.id },
      tipe: berita.tipe,
      slug: { not: null },
    },
    orderBy: { createdAt: 'desc' },
    take: 3,
  })

  const paragraphs = (berita.isi || berita.ringkasan)
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)

  const badgeColor = berita.tipe === 'pengumuman' ? '#c8972a' : '#0f2557'

  return (
    <>
      <div className="pt-24 pb-14"
        style={{ background: berita.warnaBg || 'linear-gradient(135deg,#0f2557,#1a3a80)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            <i className="fas fa-arrow-left text-xs" /> Kembali ke Berita
          </Link>

          <div className="mt-6 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                style={{ background: badgeColor }}>
                {berita.tipe}
              </span>
              <span className="text-sm text-white/70">
                <i className="fas fa-calendar mr-2" />
                {formatTanggalIndonesia(berita.tanggal)}
              </span>
              <span className="text-sm text-white/70">
                <i className="fas fa-folder-open mr-2" />
                {berita.kategori}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight"
              style={{ fontFamily: 'var(--font-playfair),serif' }}>
              {berita.judul}
            </h1>
            <p className="text-lg text-white/75 mt-5 leading-relaxed">
              {berita.ringkasan}
            </p>
          </div>
        </div>
      </div>
      <div className="gold-line" />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 grid lg:grid-cols-[minmax(0,1fr)_280px] gap-10">
          <article className="min-w-0">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10">
              <div className="max-w-none">
                {paragraphs.map((paragraph, index) => (
                  <p key={`${berita.id}-${index}`} className="text-gray-600 leading-8 mb-5 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>

              {!berita.isi && (
                <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
                  Detail lengkap belum diisi admin. Saat ini halaman menampilkan ringkasan konten.
                </div>
              )}
            </div>
          </article>

          <aside className="space-y-5">
            <div className="bg-[#f8fafc] rounded-3xl p-6 border border-gray-100">
              <h2 className="text-lg font-bold mb-4" style={{ color: '#0f2557' }}>
                Informasi Singkat
              </h2>
              <div className="space-y-3 text-sm text-gray-600">
                <p><strong>Tipe:</strong> {berita.tipe}</p>
                <p><strong>Kategori:</strong> {berita.kategori}</p>
                <p><strong>Tanggal:</strong> {formatTanggalIndonesia(berita.tanggal)}</p>
                {berita.prioritas && (
                  <p><strong>Status:</strong> Penting / Prioritas</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold mb-4" style={{ color: '#0f2557' }}>
                {berita.tipe === 'pengumuman' ? 'Pengumuman Lainnya' : 'Berita Lainnya'}
              </h2>
              <div className="space-y-4">
                {lainnya.length === 0 && (
                  <p className="text-sm text-gray-400">Belum ada konten lain.</p>
                )}
                {lainnya.map((item) => (
                  <Link key={item.id} href={`/berita/${item.slug}`}
                    className="block group p-4 -mx-4 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-navy/5 hover:-translate-y-1 border border-transparent hover:border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <p className="font-bold text-sm leading-snug group-hover:text-[#c8972a] transition-colors line-clamp-2"
                          style={{ color: '#0f2557' }}>
                          {item.judul}
                        </p>
                        <p className="text-xs text-gray-400 mt-2 flex items-center gap-2">
                          <i className="far fa-calendar-alt opacity-70" />
                          {formatTanggalIndonesia(item.tanggal)}
                        </p>
                      </div>
                      <i className="fas fa-chevron-right text-[10px] text-[#c8972a] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
