'use client'

import { useState } from 'react'

type FieldDef = {
  name: string
  label: string
  placeholder: string
  fullWidth?: boolean
}

type Props = {
  name: string
  fields: FieldDef[]
  items: Record<string, string>[]
  addLabel: string
  emptyItem: Record<string, string>
}

export default function DynamicListInput({ name, fields, items: initialItems, addLabel, emptyItem }: Props) {
  const [items, setItems] = useState<Record<string, string>[]>(
    initialItems.length > 0 ? initialItems : []
  )

  const addItem = () => setItems((prev) => [...prev, { ...emptyItem }])
  const removeItem = (index: number) => setItems((prev) => prev.filter((_, i) => i !== index))

  const updateField = (index: number, fieldName: string, value: string) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [fieldName]: value } : item))
    )
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="relative bg-gray-50/80 rounded-xl p-4 border border-gray-100 group"
        >
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Hapus item"
          >
            <i className="fas fa-trash-alt text-xs" />
          </button>
          <div className="grid gap-3 pr-8">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {field.label}
                </label>
                <input
                  type="text"
                  value={item[field.name] || ''}
                  onChange={(e) => updateField(index, field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#0f2557] text-sm transition-colors bg-white"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:text-[#0f2557] hover:border-[#0f2557]/30 transition-colors flex items-center justify-center gap-2"
      >
        <i className="fas fa-plus text-xs" />
        {addLabel}
      </button>

      <input type="hidden" name={name} value={JSON.stringify(items)} />
    </div>
  )
}