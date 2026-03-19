'use client'

import { useRouter } from 'next/navigation'

interface Props {
  href: string
  asButton?: boolean
}

export default function AdminFormKembali({ href, asButton }: Props) {
  const router = useRouter()

  if (asButton) {
    return (
      <button type="button" onClick={() => router.push(href)}
        className="flex-1 py-3 rounded-xl font-semibold text-sm border border-gray-200 hover:bg-gray-50 transition-colors">
        Batal
      </button>
    )
  }

  return (
    <button type="button" onClick={() => router.push(href)}
      className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
      <i className="fas fa-arrow-left text-xs" /> Kembali
    </button>
  )
}
