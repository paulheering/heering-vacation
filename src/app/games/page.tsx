import Link from 'next/link'
import { IconTrophy, IconArrowLeft, IconMedal } from '@tabler/icons-react'

export default function GamesPage() {
  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-blue-200 hover:text-white transition-colors mb-4 text-sm font-medium">
            <IconArrowLeft size={16} />
            Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center gap-3">
            <IconTrophy size={36} />
            Games
          </h1>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-5">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <IconMedal size={24} className="text-yellow-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Family Decathlon</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Each clan competes across multiple events throughout the week.
            Events are scored by place and points are tallied on the leaderboard.
            May the best clan win!
          </p>
        </div>
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
          <IconTrophy size={48} className="mx-auto mb-3 text-yellow-400" />
          <p className="text-gray-800 font-semibold">Standings coming soon</p>
          <p className="text-gray-500 text-sm mt-2 italic">Events and scoring will be set up before the vacation.</p>
        </div>
      </div>
    </div>
  )
}
