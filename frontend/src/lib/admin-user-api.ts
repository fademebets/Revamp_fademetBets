import { getCookie } from "cookies-next"
import type { UsersResponse, UpdateUserData, PaginationParams, User } from "@/types/user"

const getAuthToken = () => {
  return getCookie("auth-token")
}

const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken()

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  }

  const response = await fetch(endpoint, config)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

export const userApi = {
  getUsers: async ({ page, limit }: Omit<PaginationParams, "search">): Promise<UsersResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })

    return apiRequest(`https://revamp-fademetbets.onrender.com/api/admin-users?${params.toString()}`)
  },

  searchUserByEmail: async (email: string): Promise<User> => {
    return apiRequest(`https://revamp-fademetbets.onrender.com/api/admin-users/email/${encodeURIComponent(email)}`)
  },

  updateUser: async (userId: string, data: UpdateUserData) => {
    return apiRequest(`https://revamp-fademetbets.onrender.com/api/admin-users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  deleteUser: async (userId: string) => {
    return apiRequest(`https://revamp-fademetbets.onrender.com/api/admin-users/${userId}`, {
      method: "DELETE",
    })
  },
}
