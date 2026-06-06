import Link from 'next/link'
import Image from 'next/image'
import { IconUsers, IconArrowLeft } from '@tabler/icons-react'
import { supabase, isConfigured } from '@/lib/supabase'
import type { CrewMember } from '@/lib/types'

export const dynamic = 'force-dynamic'

async function getCrew(): Promise<CrewMember[]> {
  if (!isConfigured) return []
  try {
    const { data } = await supabase.from('crew').select('*').order('clan').order('name')
    return data ?? []
  } catch {
    return []
  }
}

function groupByClan(members: CrewMember[]): Record<string, CrewMember[]> {
  const groups: Record<string, CrewMember[]> = {}
  for (const m of members) {
    const key = m.clan ?? 'Unclaimed'
    if (!groups[key]) groups[key] = []
    groups[key].push(m)
  }
  return groups
}

export default async function CrewPage() {
  const crew = await getCrew()
  const clans = groupByClan(crew)

  return (
    <div className="min-h-screen">
      <header className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-blue-200 hover:text-white transition-colors mb-4 text-sm font-medium"
          >
            <IconArrowLeft size={16} />
            Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center gap-3">
            <IconUsers size={36} />
            The Crew
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {!isConfigured ? (
          <EmptyState message="Configure Supabase to see crew members." />
        ) : crew.length === 0 ? (
          <EmptyState message="No crew members yet. Add rows to the crew table in Supabase." />
        ) : (
          <div className="space-y-10">
            {Object.entries(clans).map(([clan, members]) => (
              <section key={clan}>
                <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
                  {clan}
                </h2>
                <div className="flex flex-wrap justify-center gap-6">
                  {members.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


function EmptyState({ message }: { message: string }) {
  return (
    <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
      <IconUsers size={48} className="mx-auto mb-3 text-blue-300" />
      <p className="text-gray-500">{message}</p>
    </div>
  )
}

function MemberCard({ member }: { member: CrewMember }) {
  return (
    <div className="text-center w-28">
      {member.photo ? (
        <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-3">
          <Image src={member.photo} alt={member.name ?? ''} fill className="object-cover" />
        </div>
      ) : (
        <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-700 text-2xl font-bold flex items-center justify-center mx-auto mb-3">
          {(member.name ?? '?')[0]}
        </div>
      )}
      <p className="font-semibold text-gray-800 text-base leading-tight">{member.name ?? '—'}</p>
    </div>
  )
}
