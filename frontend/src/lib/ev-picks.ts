import { getCookie } from "cookies-next"
import type { EvPick, CreateEvPickData, UpdateEvPickData } from "@/types/ev"

const API_BASE_URL = "https://revamp-fademetbets-backend.onrender.com/api"

// Get auth token from cookies
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    const token = getCookie("auth-token")
    return token || null
  }
  return null
}

// Create EV Pick (Admin only)
export const createEvPick = async (data: CreateEvPickData): Promise<EvPick> => {
  const token = getAuthToken()

  const response = await fetch(`${API_BASE_URL}/ev/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to create EV pick")
  }

  return response.json()
}

// Get all EV picks (Admin only)
export const getAllEvPicks = async (): Promise<{ evs: EvPick[] }> => {
  const token = getAuthToken()

  const response = await fetch(`${API_BASE_URL}/ev`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch EV picks")
  }

  return response.json()
}

// Get active EV picks (Public)
export const getActiveEvPicks = async (): Promise<{ evs: any[]; message?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ev/active`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.log(`Failed to fetch active EV picks. Status: ${response.status}`)
      return {
        evs: [],
        message: errorData.message || `Failed to fetch picks: ${response.statusText}`,
      }
    }

    const data = await response.json().catch(() => null)

    if (!data || !Array.isArray(data.evs)) {
      return { evs: [], message: "No picks found or bad response structure." }
    }

    return { evs: data.evs }
  } catch (error) {
    console.error("Error fetching active EV picks:", error)
    return {
      evs: [],
      message: error instanceof Error ? error.message : "Failed to fetch active picks",
    }
  }
}


// Update EV Pick (Admin only)
export const updateEvPick = async (id: string, data: UpdateEvPickData): Promise<EvPick> => {
  const token = getAuthToken()

  const response = await fetch(`${API_BASE_URL}/ev/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to update EV pick")
  }

  return response.json()
}

// Delete EV Pick (Admin only)
export const deleteEvPick = async (id: string): Promise<void> => {
  const token = getAuthToken()

  const response = await fetch(`${API_BASE_URL}/ev/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to delete EV pick")
  }
}
