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
  created_at: string
}

export interface DestinationPhoto {
  id: number
  destination_id: number
  photo_url: string
  display_order: number | null
}
