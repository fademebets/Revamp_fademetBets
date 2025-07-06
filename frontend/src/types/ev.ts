export interface EvPick {
  _id: string
  title: string
  description: string
  odds: number
  evValue: number
  confidence?: string
  coverPercentage: number
  status: 'active' | 'draft' | 'expired' | 'won' | 'lost'
  date: string
  __v?: number
}

export interface CreateEvPickData {
  title: string
  description: string
  odds: number
  evValue: number
  confidence: string
  coverPercentage: number
}

export interface UpdateEvPickData extends Partial<CreateEvPickData> {}
