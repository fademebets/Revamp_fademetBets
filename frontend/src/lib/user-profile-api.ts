import { getCookie } from "cookies-next"
import type {
  User,
  UpdateProfileRequest,
  UpdateProfileResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  ApiError,
    UnsubscribeResponse,

} from "@/types/user-profile"

const API_BASE_URL = "https://revamp-fademetbets-backend.onrender.com"

const getAuthHeaders = () => {
  const token = getCookie("auth-token")
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

export const profileApi = {
  // Get user profile
  getProfile: async (): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      method: "GET",
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      const error: ApiError = await response.json()
      throw new Error(error.message || "Failed to fetch profile")
    }

    return response.json()
  },

  // Update user profile
  updateProfile: async (data: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error: ApiError = await response.json()
      throw new Error(error.message || "Failed to update profile")
    }

    return response.json()
  },

  // Change password
  changePassword: async (data: ChangePasswordRequest): Promise<ChangePasswordResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error: ApiError = await response.json()
      throw new Error(error.message || "Failed to change password")
    }

    return response.json()
  },

   // Unsubscribe user
  unsubscribe: async (): Promise<UnsubscribeResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/unsubscribe`, {
      method: "POST",
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      const error: ApiError = await response.json()
      throw new Error(error.message || "Failed to unsubscribe")
    }

    return response.json()
  },
}
