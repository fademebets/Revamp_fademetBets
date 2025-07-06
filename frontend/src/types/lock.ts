// Base Lock interface
export interface Lock {
  id: string
  sport: string
  game: string
  pick: string
  odds: number
  confidence: number
  units: number
  analysis: string
  status: "draft" | "active" | "expired"
  createdDate: string
  endingDate: string
  createdAt: string
  updatedAt: string
}

// API Request interfaces
export interface CreateLockRequest {
  sport: string
  game: string
  pick: string
  odds: number
  confidence: number
  units: number
  analysis: string
  status: "draft" | "active" | "expired"
  date: string
}

export interface UpdateLockRequest {
  sport: string
  game: string
  pick: string
  odds: number
  confidence: number
  units: number
  analysis: string
  status: "draft" | "active" | "expired"
  date: string
}

// API Response interfaces
export interface ApiResponse<T> {
  success: boolean
  data: T
  message: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  message: string
}

// Lock status type
export type LockStatus = "draft" | "active" | "expired"

// Form data interface
export interface LockFormData {
  sport: string
  customSport: string
  game: string
  pick: string
  odds: string
  confidence: string
  units: string
  analysis: string
  status: string
}
