type StatistikItem = {
  nilai: string
  label: string
}

type PrestasiItem = {
  icon: string
  judul: string
  keterangan: string
}

export function parseJsonArray<T>(value: string | null | undefined, fallback: T[] = []): T[] {
  if (!value) return fallback

  try {
    const parsed = JSON.parse(value) as unknown
    return Array.isArray(parsed) ? (parsed as T[]) : fallback
  } catch {
    return fallback
  }
}

export function parseTextareaLines(value: FormDataEntryValue | null): string[] {
  return String(value || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function parseStatistikTextarea(value: FormDataEntryValue | null): StatistikItem[] {
  return parseTextareaLines(value)
    .map((line) => {
      const [nilai, ...labelParts] = line.split('|').map((item) => item.trim())
      const label = labelParts.join(' | ').trim()

      if (!nilai || !label) return null

      return { nilai, label }
    })
    .filter((item): item is StatistikItem => Boolean(item))
}

export function parsePrestasiTextarea(value: FormDataEntryValue | null): PrestasiItem[] {
  return parseTextareaLines(value)
    .map((line) => {
      const [icon, judul, ...keteranganParts] = line.split('|').map((item) => item.trim())
      const keterangan = keteranganParts.join(' | ').trim()

      if (!icon || !judul || !keterangan) return null

      return { icon, judul, keterangan }
    })
    .filter((item): item is PrestasiItem => Boolean(item))
}

export function stringifyStatistikTextarea(items: StatistikItem[]): string {
  return items.map((item) => `${item.nilai} | ${item.label}`).join('\n')
}

export function stringifyPrestasiTextarea(items: PrestasiItem[]): string {
  return items.map((item) => `${item.icon} | ${item.judul} | ${item.keterangan}`).join('\n')
}
