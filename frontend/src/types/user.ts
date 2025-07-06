export interface User {
  _id: string
  email: string
  password: string | null
  firstName: string | null
  lastName: string | null
  phoneNumber: string | null
  address: string | null
  stripeCustomerId: string
  subscriptionStatus: "active" | "inactive" | "cancelled"
  resetCode: string | null
  subscriptionEndDate: string | null
  resetCodeExpiry: string | null
  lastSessionId: string | null
  createdAt: string | null
  updatedAt: string | null
  __v: number
}

export interface UsersResponse {
  totalUsers: number
  totalPages: number
  currentPage: number
  users: User[]
}

export interface UpdateUserData {
  firstName?: string
  lastName?: string
  email?: string
  phoneNumber?: string
  subscriptionStatus?: "active" | "inactive" | "cancelled"
  subscriptionEndDate?: string
}

export interface PaginationParams {
  page: number
  limit: number
  search?: string
}
