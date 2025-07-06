import { getCookie } from "cookies-next"

const API_BASE_URL = "https://revamp-fademetbets.onrender.com/api"

interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}

export const settingsApi = {
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    const token = getCookie("auth-token")

    if (!token) {
      throw new Error("Authentication token not found. Please log in again.")
    }

    const response = await fetch(`${API_BASE_URL}/admin/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid current password or authentication expired")
      } else if (response.status === 400) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Invalid password format")
      } else if (response.status === 500) {
        throw new Error("Server error. Please try again later.")
      } else {
        throw new Error(`Failed to change password: ${response.statusText}`)
      }
    }

    // If response has content, parse it
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      const result = await response.json()
      return result
    }
  },

  async notifySubscribers(): Promise<void> {
    const token = getCookie("auth-token")

    if (!token) {
      throw new Error("Authentication token not found. Please log in again.")
    }

    const response = await fetch(`${API_BASE_URL}/admin/notify-lock-update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Authentication expired. Please log in again.")
      } else if (response.status === 500) {
        throw new Error("Server error. Please try again later.")
      } else {
        throw new Error(`Failed to notify subscribers: ${response.statusText}`)
      }
    }

    // If response has content, parse it
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      const result = await response.json()
      return result
    }
  },
}
