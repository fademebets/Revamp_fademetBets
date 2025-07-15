// Base Lock interface
export interface Lock {
  id: string
  sport: string
  game: string
  pick: string
  odds: string // Changed to string to match API
  confidence: string // Changed to string to match API (High/Medium/Low)
  units: string // Changed to string to match API (e.g., "2u")
  analysis: string
  status: "draft" | "active" | "expired"
  createdDate: string
  endingDate: string
  createdAt: string
  updatedAt: string
}

// API Request interfaces - matching your backend structure
export interface CreateLockRequest {
  sport: string
  game: string
  pick: string
  odds: string // String to match your API
  confidence: string // String to match your API (High/Medium/Low)
  unit: string // Changed from units to unit to match your API
  analysis: string
  status: "draft" | "active" | "expired"
}

export interface UpdateLockRequest {
  sport: string
  game: string
  pick: string
  odds: string // String to match your API
  confidence: string // String to match your API (High/Medium/Low)
  unit: string // Changed from units to unit to match your API
  analysis: string
  status: "draft" | "active" | "expired"
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
  unit: string // Changed from units to unit
  analysis: string
  status: string
}
