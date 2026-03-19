'use client'

import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!show) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-xl flex items-center justify-center z-40 transition-all hover:scale-110"
      style={{ background: '#c8972a' }}
      aria-label="Kembali ke atas"
    >
      <i className="fas fa-arrow-up text-white" />
    </button>
  )
}
