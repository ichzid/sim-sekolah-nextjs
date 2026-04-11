'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { toast } from 'react-toastify'

export default function ActionToast() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const successMsg = searchParams.get('toast_success')
    const errorMsg = searchParams.get('toast_error')

    if (successMsg || errorMsg) {
      if (successMsg) toast.success(decodeURIComponent(successMsg))
      if (errorMsg) toast.error(decodeURIComponent(errorMsg))

      // Clean the URL without causing a full page reload or scroll reset
      const newParams = new URLSearchParams(searchParams.toString())
      newParams.delete('toast_success')
      newParams.delete('toast_error')
      const queryStr = newParams.toString()
      const newUrl = queryStr ? `${pathname}?${queryStr}` : pathname
      
      router.replace(newUrl, { scroll: false })
    }
  }, [searchParams, pathname, router])

  return null
}
