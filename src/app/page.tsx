import Link from 'next/link'
import Image from 'next/image'
import type { ComponentType } from 'react'
import {
  IconUsers,
  IconMapPin,
  IconCalendar,
  IconListCheck,
  IconTrophy,
} from '@tabler/icons-react'
import { supabase, isConfigured } from '@/lib/supabase'
import type { CrewMember } from '@/lib/types'

export const dynamic = 'force-dynamic'

type IconProps = { size?: number | string; className?: string }

interface CardData {
  title: string
  href: string
  Icon: ComponentType<IconProps>
  iconBg: string
  iconColor: string
  preview: React.ReactNode
}

async function getCrewPreview(): Promise<CrewMember[]> {
  if (!isConfigured) return []
  try {
    const { data } = await supabase.from('crew').select('*').order('name').limit(8)
    return data ?? []
  } catch {
    return []
  }
}

function CrewPreview({ members }: { members: CrewMember[] }) {
  if (!isConfigured) {
    return <p className="text-sm text-gray-400 italic">Configure Supabase to get started</p>
  }
  if (members.length === 0) {
    return <p className="text-sm text-gray-400 italic">No crew members yet</p>
  }
  const shown = members.slice(0, 6)
  const extra = members.length - 6
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {shown.map((m) =>
        m.photo ? (
          <div key={m.id} className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-white flex-shrink-0">
            <Image src={m.photo} alt={m.name ?? ''} fill className="object-cover" />
          </div>
        ) : (
          <div
            key={m.id}
            className="w-9 h-9 rounded-full bg-blue-100 ring-2 ring-white flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0"
          >
            {(m.name ?? '?')[0]}
          </div>
        )
      )}
      {extra > 0 && (
        <div className="w-9 h-9 rounded-full bg-gray-100 ring-2 ring-white flex items-center justify-center text-gray-500 text-xs font-semibold flex-shrink-0">
          +{extra}
        </div>
      )}
      <span className="ml-2 text-sm text-gray-500">
        {members.length} member{members.length !== 1 ? 's' : ''}
      </span>
    </div>
  )
}

export default async function Home() {
  const crew = await getCrewPreview()

  const cards: CardData[] = [
    {
      title: 'The Crew',
      href: '/crew',
      Icon: IconUsers,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      preview: <CrewPreview members={crew} />,
    },
    {
      title: 'Where',
      href: '/where',
      Icon: IconMapPin,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      preview: <p className="text-sm text-gray-400 italic">Destination TBD</p>,
    },
    {
      title: 'When',
      href: '/when',
      Icon: IconCalendar,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      preview: <p className="text-sm text-gray-400 italic">Dates TBD</p>,
    },
    {
      title: 'What To Do',
      href: '/activities',
      Icon: IconListCheck,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      preview: <p className="text-sm text-gray-400 italic">Activities TBD</p>,
    },
    {
      title: 'Games',
      href: '/games',
      Icon: IconTrophy,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      preview: <p className="text-sm text-gray-400 italic">Decathlon standings coming soon</p>,
    },
  ]

  return (
    <div className="min-h-screen px-4 py-12 sm:py-16">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-10 sm:mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Heering Family<br className="sm:hidden" /> Vacation
          </h1>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cards.map((card, i) => {
            const Icon = card.Icon
            return (
              <Link
                key={card.title}
                href={card.href}
                className={`group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 block${
                  i === 4 ? ' sm:col-span-2 sm:max-w-sm sm:mx-auto w-full' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 ${card.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon size={22} className={card.iconColor} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">{card.title}</h2>
                  <span className="ml-auto text-gray-300 group-hover:text-blue-500 transition-colors text-xl">
                    →
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-4 min-h-8">
                  {card.preview}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
