'use client'

export default function DeleteButton({
  className,
  title,
  confirmMessage = 'Yakin ingin menghapus data ini?',
  children
}: {
  className?: string
  title?: string
  confirmMessage?: string
  children: React.ReactNode
}) {
  return (
    <button
      type="submit"
      className={className}
      title={title}
      onClick={(e) => {
        if (!confirm(confirmMessage)) {
          e.preventDefault()
        }
      }}
    >
      {children}
    </button>
  )
}
