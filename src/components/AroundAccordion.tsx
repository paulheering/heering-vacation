'use client'

import { useState } from 'react'
import {
  IconChevronDown,
  IconClock,
  IconMapPin,
  IconExternalLink,
} from '@tabler/icons-react'
import type { AroundItem } from '@/lib/types'

const HOME_ADDRESS = '12 Defelice Road, Narragansett, RI'

function ListingCard({ item }: { item: AroundItem }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
      {item.photo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.photo}
          alt={item.name ?? ''}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-gray-800 leading-tight">
            {item.name ?? 'Untitled'}
          </h3>
          {item.minutes != null && (
            <span className="flex-shrink-0 inline-flex items-center gap-1 bg-blue-50 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
              <IconClock size={13} />
              {item.minutes} min
            </span>
          )}
        </div>

        {item.address && (
          <a
            href={`https://maps.apple.com/?saddr=${encodeURIComponent(HOME_ADDRESS)}&daddr=${encodeURIComponent(item.address)}&dirflg=d`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-1.5 text-gray-500 hover:text-blue-600 transition-colors group/addr"
          >
            <IconMapPin size={15} className="mt-0.5 flex-shrink-0 text-gray-400 group-hover/addr:text-blue-500" />
            <p className="text-sm leading-tight underline decoration-gray-300 underline-offset-2 group-hover/addr:decoration-blue-400">
              {item.address}
            </p>
          </a>
        )}

        {item.notes && (
          <p className="text-sm text-gray-600 leading-relaxed">{item.notes}</p>
        )}

        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-semibold pt-1"
          >
            <IconExternalLink size={15} />
            Visit website
          </a>
        )}
      </div>
    </div>
  )
}

function CategorySection({
  category,
  items,
  defaultOpen,
}: {
  category: string
  items: AroundItem[]
  defaultOpen: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <h2 className="text-lg font-bold text-gray-800">{category}</h2>
        <span className="inline-flex items-center justify-center bg-purple-100 text-purple-700 text-sm font-semibold min-w-6 h-6 px-2 rounded-full">
          {items.length}
        </span>
        <IconChevronDown
          size={20}
          className={`ml-auto text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {items.map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function AroundAccordion({ items }: { items: AroundItem[] }) {
  // Group by category, preserving the order categories first appear.
  const groups = new Map<string, AroundItem[]>()
  for (const item of items) {
    const cat = item.category?.trim() || 'Other'
    if (!groups.has(cat)) groups.set(cat, [])
    groups.get(cat)!.push(item)
  }

  const entries = Array.from(groups.entries())

  return (
    <div className="space-y-4">
      {entries.map(([category, catItems], i) => (
        <CategorySection
          key={category}
          category={category}
          items={catItems}
          defaultOpen={i === 0}
        />
      ))}
    </div>
  )
}
