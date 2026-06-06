import Link from 'next/link'
import { IconMapPin, IconArrowLeft, IconCalendar, IconExternalLink } from '@tabler/icons-react'
import { supabase, isConfigured } from '@/lib/supabase'
import type { Destination, DestinationPhoto } from '@/lib/types'
import PhotoCarousel from '@/components/PhotoCarousel'

export const dynamic = 'force-dynamic'

async function getDestination(): Promise<Destination | null> {
  if (!isConfigured) return null
  try {
    const { data } = await supabase.from('destination').select('*').limit(1).single()
    return data ?? null
  } catch {
    return null
  }
}

async function getPhotos(destinationId: number): Promise<string[]> {
  try {
    const { data } = await supabase
      .from('destination_photos')
      .select('photo_url')
      .eq('destination_id', destinationId)
      .order('display_order')
    return (data ?? []).map(p => p.photo_url)
  } catch {
    return []
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default async function WherePage() {
  const destination = await getDestination()
  const photos = destination ? await getPhotos(destination.id) : []

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-blue-200 hover:text-white transition-colors mb-4 text-sm font-medium">
            <IconArrowLeft size={16} />
            Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center gap-3">
            <IconMapPin size={36} />
            Where
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {!destination ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
            <p className="text-gray-500">No destination info yet.</p>
          </div>
        ) : (
          <>
            {/* Property name + address */}
            <div>
              {destination.name && (
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{destination.name}</h2>
              )}
              {destination.address && (
                <div className="flex items-center gap-1.5 text-gray-500">
                  <IconMapPin size={16} className="text-green-500 flex-shrink-0" />
                  <span>{destination.address}</span>
                </div>
              )}
            </div>

            {/* Photo carousel */}
            {photos.length > 0 && <PhotoCarousel photos={photos} />}

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  <IconCalendar size={14} />
                  Check-in
                </div>
                <p className="font-semibold text-gray-800">{formatDate(destination.checkin)}</p>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  <IconCalendar size={14} />
                  Check-out
                </div>
                <p className="font-semibold text-gray-800">{formatDate(destination.checkout)}</p>
              </div>
            </div>

            {/* Description */}
            {destination.description && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{destination.description}</p>
              </div>
            )}

            {/* Airbnb link */}
            {destination.airbnb_url && (
              <a
                href={destination.airbnb_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors"
              >
                <IconExternalLink size={18} />
                View on Airbnb
              </a>
            )}
          </>
        )}
      </div>
    </div>
  )
}
