'use client'

import { useMemo, useState } from 'react'
import { IconChevronDown, IconCheck } from '@tabler/icons-react'

interface Section {
  title: string
  items: string[]
}

// Minimal parser for the simple markdown used in the amenities field:
// `## Heading` starts a section; every other non-empty line is an item
// (a leading "- " bullet marker is stripped).
function parseAmenities(md: string): Section[] {
  const sections: Section[] = []
  let current: Section | null = null

  for (const raw of md.split('\n')) {
    const line = raw.trim()
    if (!line) continue

    if (line.startsWith('## ')) {
      current = { title: line.slice(3).trim().replace(/:$/, ''), items: [] }
      sections.push(current)
    } else {
      const item = line.replace(/^[-*]\s+/, '').trim()
      if (!item) continue
      if (!current) {
        current = { title: '', items: [] }
        sections.push(current)
      }
      current.items.push(item)
    }
  }

  return sections.filter((s) => s.title || s.items.length)
}

export default function Amenities({ markdown }: { markdown: string }) {
  const [open, setOpen] = useState(false)
  const sections = useMemo(() => parseAmenities(markdown), [markdown])

  const total = sections.reduce((n, s) => n + s.items.length, 0)
  if (total === 0) return null

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-6 py-5 text-left hover:bg-gray-50 transition-colors"
      >
        <h2 className="text-xl font-bold text-gray-800">Amenities</h2>
        <span className="inline-flex items-center justify-center bg-green-100 text-green-700 text-sm font-semibold min-w-6 h-6 px-2 rounded-full">
          {total}
        </span>
        <IconChevronDown
          size={20}
          className={`ml-auto text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="px-6 pb-6 pt-1 border-t border-gray-100">
          <div className="mt-4 gap-x-8 gap-y-6 sm:columns-2">
            {sections.map((section, i) => (
              <div key={i} className="break-inside-avoid mb-6">
                {section.title && (
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
                    {section.title}
                  </h3>
                )}
                <ul className="space-y-1.5">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-700 text-sm leading-snug">
                      <IconCheck size={16} className="mt-0.5 flex-shrink-0 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
