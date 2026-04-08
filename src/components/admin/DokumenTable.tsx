'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import DeleteButton from '@/components/admin/DeleteButton'
import { hapusDokumen } from '@/actions/dokumen'
import { formatTanggalIndonesia } from '@/lib/format'

interface DokumenRow {
  id: number
  nama: string
  tipe: string
  ukuran: string
  tanggal: string
  icon: string
  warnaBg: string
  warnaIcon: string
  aktif: boolean
}

const PAGE_SIZES = [10, 25, 50]

export default function DokumenTable({ data }: { data: DokumenRow[] }) {
  const [search, setSearch] = useState('')
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [sortField, setSortField] = useState<'nama' | 'tanggal' | 'tipe'>('tanggal')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    if (!q) return data
    return data.filter(
      (d) =>
        d.nama.toLowerCase().includes(q) ||
        d.tipe.toLowerCase().includes(q)
    )
  }, [data, search])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let cmp = 0
      if (sortField === 'nama') cmp = a.nama.localeCompare(b.nama)
      else if (sortField === 'tanggal') cmp = a.tanggal.localeCompare(b.tanggal)
      else cmp = a.tipe.localeCompare(b.tipe)
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filtered, sortField, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * perPage
  const pageData = sorted.slice(start, start + perPage)

  const pageNumbers = useMemo(() => {
    const pages: (number | '...')[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (safePage > 3) pages.push('...')
      const from = Math.max(2, safePage - 1)
      const to = Math.min(totalPages - 1, safePage + 1)
      for (let i = from; i <= to; i++) pages.push(i)
      if (safePage < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }
    return pages
  }, [totalPages, safePage])

  function toggleSort(field: 'nama' | 'tanggal' | 'tipe') {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortField(field); setSortDir('asc') }
    setPage(1)
  }

  function SortIcon({ field }: { field: 'nama' | 'tanggal' | 'tipe' }) {
    if (sortField !== field) return <i className="fas fa-sort text-gray-300 ml-1 text-xs" />
    return sortDir === 'asc'
      ? <i className="fas fa-sort-up ml-1 text-xs" style={{ color: '#0f2557' }} />
      : <i className="fas fa-sort-down ml-1 text-xs" style={{ color: '#0f2557' }} />
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-gray-100">
        <div className="relative w-full sm:w-72">
          <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder="Cari dokumen..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#0f2557] transition-colors" />
          {search && (
            <button onClick={() => { setSearch(''); setPage(1) }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <i className="fas fa-times text-xs" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Tampilkan</span>
          <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1) }}
            className="px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#0f2557] bg-white cursor-pointer">
            {PAGE_SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          <span>data</span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <i className="fas fa-file-alt text-4xl mb-3 block" />
          <p>{search ? 'Tidak ditemukan hasil untuk pencarian tersebut.' : 'Belum ada dokumen. Tambahkan sekarang!'}</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="px-6 py-4 cursor-pointer select-none hover:text-gray-600 transition-colors"
                    onClick={() => toggleSort('nama')}>
                    Dokumen <SortIcon field="nama" />
                  </th>
                  <th className="px-6 py-4 cursor-pointer select-none hover:text-gray-600 transition-colors hidden md:table-cell"
                    onClick={() => toggleSort('tipe')}>
                    Tipe <SortIcon field="tipe" />
                  </th>
                  <th className="px-6 py-4 cursor-pointer select-none hover:text-gray-600 transition-colors hidden md:table-cell"
                    onClick={() => toggleSort('tanggal')}>
                    Tanggal <SortIcon field="tanggal" />
                  </th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pageData.map((d) => (
                  <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: d.warnaBg }}>
                          <i className={`fas ${d.icon}`} style={{ color: d.warnaIcon }} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 line-clamp-1">{d.nama}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{d.ukuran} • {!d.aktif ? 'Nonaktif' : 'Aktif'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                        {d.tipe}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">
                      {formatTanggalIndonesia(d.tanggal)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/dokumen/edit/${d.id}`}
                          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors" title="Edit">
                          <i className="fas fa-pen text-blue-500 text-sm" />
                        </Link>
                        <form action={hapusDokumen.bind(null, d.id)}>
                          <DeleteButton
                            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                            title="Hapus" confirmMessage="Hapus dokumen ini?">
                            <i className="fas fa-trash text-red-400 text-sm" />
                          </DeleteButton>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-gray-100 text-sm text-gray-500">
            <p>
              Menampilkan <span className="font-medium text-gray-700">{start + 1}</span>
              {'–'}
              <span className="font-medium text-gray-700">{Math.min(start + perPage, filtered.length)}</span>
              {' '}dari <span className="font-medium text-gray-700">{filtered.length}</span> data
              {search && <> (filter aktif)</>}
            </p>
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePage <= 1}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <i className="fas fa-chevron-left text-xs" />
                </button>
                {pageNumbers.map((p, i) =>
                  p === '...' ? (
                    <span key={`d-${i}`} className="w-8 h-8 flex items-center justify-center text-gray-400">…</span>
                  ) : (
                    <button key={p} onClick={() => setPage(p)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${p === safePage ? 'text-white' : 'hover:bg-gray-100 text-gray-600'}`}
                      style={p === safePage ? { background: '#0f2557' } : {}}>
                      {p}
                    </button>
                  )
                )}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safePage >= totalPages}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <i className="fas fa-chevron-right text-xs" />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}