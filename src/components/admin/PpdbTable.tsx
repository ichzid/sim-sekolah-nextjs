'use client'

import { useState, useMemo } from 'react'
import { updateStatusPpdb } from '@/actions/ppdb'

interface PpdbRow {
  id: number
  namaLengkap: string
  nisn: string | null
  asalSekolah: string | null
  namaOrtu: string
  teleponOrtu: string
  jalur: string
  status: string
  catatan: string | null
  createdAt: Date
}

const statusColor: Record<string, string> = {
  pending: '#d97706',
  diterima: '#16a34a',
  ditolak: '#dc2626',
}

const PAGE_SIZES = [10, 25, 50]

export default function PpdbTable({ data }: { data: PpdbRow[] }) {
  const [search, setSearch] = useState('')
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [sortField, setSortField] = useState<'nama' | 'jalur' | 'status' | 'tanggal'>('tanggal')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    if (!q) return data
    return data.filter(
      (p) =>
        p.namaLengkap.toLowerCase().includes(q) ||
        (p.nisn ?? '').toLowerCase().includes(q) ||
        (p.asalSekolah ?? '').toLowerCase().includes(q) ||
        p.namaOrtu.toLowerCase().includes(q) ||
        p.teleponOrtu.toLowerCase().includes(q) ||
        p.jalur.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q)
    )
  }, [data, search])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let cmp = 0
      if (sortField === 'nama') cmp = a.namaLengkap.localeCompare(b.namaLengkap)
      else if (sortField === 'jalur') cmp = a.jalur.localeCompare(b.jalur)
      else if (sortField === 'status') cmp = a.status.localeCompare(b.status)
      else cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
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

  function toggleSort(field: 'nama' | 'jalur' | 'status' | 'tanggal') {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortField(field); setSortDir('asc') }
    setPage(1)
  }

  function SortIcon({ field }: { field: 'nama' | 'jalur' | 'status' | 'tanggal' }) {
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
            placeholder="Cari pendaftar..."
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
          <i className="fas fa-user-graduate text-4xl mb-3 block" />
          <p>{search ? 'Tidak ditemukan hasil untuk pencarian tersebut.' : 'Belum ada pendaftar.'}</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="px-6 py-4 cursor-pointer select-none hover:text-gray-600 transition-colors"
                    onClick={() => toggleSort('nama')}>
                    Pendaftar <SortIcon field="nama" />
                  </th>
                  <th className="px-6 py-4 hidden lg:table-cell">Orang Tua</th>
                  <th className="px-6 py-4 hidden lg:table-cell">Telepon</th>
                  <th className="px-6 py-4 cursor-pointer select-none hover:text-gray-600 transition-colors hidden md:table-cell"
                    onClick={() => toggleSort('jalur')}>
                    Jalur <SortIcon field="jalur" />
                  </th>
                  <th className="px-6 py-4 cursor-pointer select-none hover:text-gray-600 transition-colors"
                    onClick={() => toggleSort('status')}>
                    Status <SortIcon field="status" />
                  </th>
                  <th className="px-6 py-4 cursor-pointer select-none hover:text-gray-600 transition-colors hidden md:table-cell"
                    onClick={() => toggleSort('tanggal')}>
                    Tanggal <SortIcon field="tanggal" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {pageData.map((p) => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="min-w-0">
                        <p className="font-medium text-gray-800">{p.namaLengkap}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {p.asalSekolah ?? '-'}
                          {p.nisn && <> • NISN: {p.nisn}</>}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm hidden lg:table-cell">{p.namaOrtu}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm hidden lg:table-cell">{p.teleponOrtu}</td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="capitalize px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        {p.jalur}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <form action={updateStatusPpdb.bind(null, p.id)} className="flex items-center gap-2">
                        <select name="status" defaultValue={p.status}
                          className="px-2 py-1 rounded-lg border text-xs font-semibold outline-none focus:border-[#0f2557] transition-colors"
                          style={{
                            background: (statusColor[p.status] || '#6b7280') + '10',
                            borderColor: (statusColor[p.status] || '#6b7280') + '40',
                            color: statusColor[p.status] ?? '#6b7280',
                          }}>
                          <option value="pending">Pending</option>
                          <option value="diterima">Diterima</option>
                          <option value="ditolak">Ditolak</option>
                        </select>
                        <button type="submit"
                          className="w-7 h-7 rounded-lg flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                          title="Simpan Status">
                          <i className="fas fa-check text-xs" />
                        </button>
                      </form>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs hidden md:table-cell">
                      {new Date(p.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
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