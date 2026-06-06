import Link from 'next/link'
import { IconCalendar, IconArrowLeft } from '@tabler/icons-react'

export default function WhenPage() {
  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-blue-200 hover:text-white transition-colors mb-4 text-sm font-medium">
            <IconArrowLeft size={16} />
            Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center gap-3">
            <IconCalendar size={36} />
            When
          </h1>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
          <IconCalendar size={48} className="mx-auto mb-4 text-orange-400" />
          <p className="text-2xl font-bold text-gray-800">August 1st – August 8th, 2026</p>
          <p className="text-gray-400 text-base mt-4 italic">Dude, what extra information are you looking for</p>
        </div>
      </div>
    </div>
  )
}
