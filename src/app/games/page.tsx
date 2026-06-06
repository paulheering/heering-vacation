import Link from 'next/link'
import { IconTrophy, IconArrowLeft } from '@tabler/icons-react'
import { supabase, isConfigured } from '@/lib/supabase'
import type { Game } from '@/lib/types'

export const dynamic = 'force-dynamic'

async function getGames(): Promise<Game[]> {
  if (!isConfigured) return []
  try {
    const { data } = await supabase.from('games').select('*').order('created_at')
    return data ?? []
  } catch {
    return []
  }
}

export default async function GamesPage() {
  const games = await getGames()

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

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {games.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
            <IconTrophy size={48} className="mx-auto mb-3 text-yellow-400" />
            <p className="text-gray-500">No games added yet.</p>
          </div>
        ) : (
          games.map((game) => (
            <div key={game.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="p-6 pb-4">
                <h2 className="text-2xl font-bold text-gray-800">{game.name}</h2>
              </div>
              {game.photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={game.photo}
                  alt={game.name ?? ''}
                  className="w-full h-56 object-cover"
                />
              )}
              {game.description && (
                <div className="p-6 pt-4">
                  <p className="text-gray-600 leading-relaxed">{game.description}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
