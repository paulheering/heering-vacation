import Link from 'next/link'
import { IconCalendar, IconArrowLeft } from '@tabler/icons-react'

export default function WhenPage() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-blue-200 hover:text-white transition-colors mb-8 text-sm font-medium"
        >
          <IconArrowLeft size={16} />
          Home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 flex items-center gap-3">
          <IconCalendar size={36} />
          When
        </h1>
        <div className="bg-white/10 rounded-2xl p-10 text-center">
          <IconCalendar size={48} className="mx-auto mb-3 text-orange-300" />
          <p className="text-white text-lg font-semibold">Dates TBD</p>
          <p className="text-blue-200 text-sm mt-2">Travel dates to be announced.</p>
        </div>
      </div>
    </div>
  )
}
