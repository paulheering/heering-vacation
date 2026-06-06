export interface CrewMember {
  id: number
  name: string | null
  photo: string | null
  clan: string | null
  created_at: string
}

export interface Destination {
  id: number
  name: string | null
  address: string | null
  photo: string | null
  description: string | null
  checkin: string | null
  checkout: string | null
  airbnb_url: string | null
  amenities: string | null
  created_at: string
}

export interface Game {
  id: number
  name: string | null
  description: string | null
  photo: string | null
  created_at: string
}

export interface AroundItem {
  id: number
  created_at: string
  name: string | null
  category: string | null
  url: string | null
  notes: string | null
  photo: string | null
  address: string | null
  minutes: number | null
}

export interface DestinationPhoto {
  id: number
  destination_id: number
  photo_url: string
  display_order: number | null
}
