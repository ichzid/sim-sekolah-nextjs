const DEFAULT_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}

export function formatTanggalIndonesia(
  value: string | Date | null | undefined,
  options: Intl.DateTimeFormatOptions = DEFAULT_DATE_FORMAT
) {
  if (!value) return '-'

  if (value instanceof Date) {
    return value.toLocaleDateString('id-ID', options)
  }

  const trimmed = value.trim()
  if (!trimmed) return '-'

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return new Date(`${trimmed}T00:00:00`).toLocaleDateString('id-ID', options)
  }

  const parsed = new Date(trimmed)
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString('id-ID', options)
  }

  return trimmed
}

export function normalizeTanggalInput(value: string | FormDataEntryValue | null) {
  if (typeof value !== 'string') {
    return new Date().toISOString().slice(0, 10)
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return new Date().toISOString().slice(0, 10)
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed
  }

  const parsed = new Date(trimmed)
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10)
  }

  return trimmed
}

export function toDateInputValue(value: string | null | undefined) {
  if (!value) return ''

  const trimmed = value.trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed
  }

  const parsed = new Date(trimmed)
  if (Number.isNaN(parsed.getTime())) {
    return ''
  }

  return parsed.toISOString().slice(0, 10)
}
