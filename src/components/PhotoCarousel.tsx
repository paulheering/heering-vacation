'use client'

import { useState } from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

export default function PhotoCarousel({ photos }: { photos: string[] }) {
  const [current, setCurrent] = useState(0)

  if (photos.length === 0) return null

  const prev = () => setCurrent(i => (i - 1 + photos.length) % photos.length)
  const next = () => setCurrent(i => (i + 1) % photos.length)

  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 h-64 sm:h-96">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photos[current]}
          alt={`Photo ${current + 1} of ${photos.length}`}
          className="w-full h-full object-cover"
        />

        {photos.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
            >
              <IconChevronLeft size={20} className="text-gray-700" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
            >
              <IconChevronRight size={20} className="text-gray-700" />
            </button>

            <div className="absolute bottom-3 right-4 bg-black/50 text-white text-xs font-medium px-2 py-1 rounded-full">
              {current + 1} / {photos.length}
            </div>
          </>
        )}
      </div>

      {photos.length > 1 && (
        <div className="flex justify-center gap-1.5 pt-3">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-200 ${
                i === current ? 'bg-blue-600 w-5' : 'bg-gray-300 w-2'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
