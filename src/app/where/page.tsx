import Link from 'next/link'
import { IconMapPin, IconArrowLeft } from '@tabler/icons-react'

export default function WherePage() {
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
          <IconMapPin size={48} className="mx-auto mb-3 text-green-400" />
          <p className="text-gray-800 text-lg font-semibold">Destination TBD</p>
          <p className="text-gray-500 text-sm mt-2">Check back soon for vacation destination details.</p>
        </div>
      </div>
    </div>
  )
}
