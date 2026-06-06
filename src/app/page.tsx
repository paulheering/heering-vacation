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
import type { CrewMember, Destination } from '@/lib/types'

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

async function getDestinationPreview(): Promise<Destination | null> {
  if (!isConfigured) return null
  try {
    const { data } = await supabase.from('destination').select('*').limit(1).single()
    return data ?? null
  } catch {
    return null
  }
}

async function getCrewPreview(): Promise<CrewMember[]> {
  if (!isConfigured) return []
  try {
    const { data } = await supabase.from('crew').select('*').order('clan').order('name')
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
  return (
    <div className="grid grid-cols-5 gap-2">
      {members.map((m) =>
        m.photo ? (
          <div key={m.id} className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white flex-shrink-0">
            <Image src={m.photo} alt={m.name ?? ''} fill className="object-cover" />
          </div>
        ) : (
          <div
            key={m.id}
            className="w-10 h-10 rounded-full bg-blue-100 ring-2 ring-white flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0"
          >
            {(m.name ?? '?')[0]}
          </div>
        )
      )}
    </div>
  )
}

export default async function Home() {
  const [crew, destination] = await Promise.all([getCrewPreview(), getDestinationPreview()])

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
      preview: (
        <div>
          {destination?.photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={destination.photo}
              alt={destination.name ?? 'Destination'}
              className="w-full h-24 object-cover rounded-xl mb-3"
            />
          )}
          <div className="flex items-start gap-1.5">
            <IconMapPin size={15} className="text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-700 leading-tight">12 Defelice Rd</p>
              <p className="text-sm text-gray-500 leading-tight">Narragansett, Rhode Island</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'When',
      href: '/when',
      Icon: IconCalendar,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      preview: (
        <div className="flex items-start gap-2">
          <IconCalendar size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm font-medium text-gray-700">August 1st – August 8th, 2026</p>
        </div>
      ),
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
    <div className="min-h-screen">
      <header className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 px-4 py-12 sm:py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
          Heering Family<br className="sm:hidden" /> Vacation
        </h1>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10">
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
