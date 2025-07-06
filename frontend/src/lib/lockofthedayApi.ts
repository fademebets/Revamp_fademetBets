import { getCookie } from "cookies-next"
import type { Lock, CreateLockRequest, UpdateLockRequest, ApiResponse, PaginatedResponse } from "@/types/lock"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://revamp-fademetbets.onrender.com/api"

const getAuthToken = () => {
  return getCookie("auth-token")
}

const createAuthHeaders = () => {
  const token = getAuthToken()
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

// Safe number conversion utility
const safeNumber = (value: any, defaultValue = 0): number => {
  if (value === null || value === undefined) return defaultValue
  const num = Number(value)
  return isNaN(num) ? defaultValue : num
}

// Transform API response to match our Lock interface
const transformLockData = (apiLock: any): Lock => {
  return {
    id: apiLock._id || apiLock.id,
    sport: apiLock.sport || "Unknown",
    game: apiLock.game || "Unknown Game",
    pick: apiLock.pick || "Unknown Pick",
    odds: safeNumber(apiLock.odds, 0),
        confidence: apiLock.confidence || "Unknown",  // keep as string

    units: safeNumber(apiLock.units, 1),
    analysis: apiLock.analysis || "",
    status: apiLock.status || "draft",
    createdDate: apiLock.date || apiLock.createdDate || new Date().toISOString(),
    endingDate: apiLock.date || apiLock.endingDate || new Date().toISOString(),
    createdAt: apiLock.createdAt || apiLock.date || new Date().toISOString(),
    updatedAt: apiLock.updatedAt || apiLock.date || new Date().toISOString(),
  }
}

export const lockApi = {
  // Get all locks with pagination (Admin)
  getAllLocks: async (page = 1, limit = 10): Promise<PaginatedResponse<Lock>> => {
    try {
      console.log(`Fetching locks: page=${page}, limit=${limit}`)

      const response = await fetch(`${API_BASE_URL}/locks/all?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: createAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch locks: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("API Response:", data)

      // Handle different API response structures
      const locks = data.locks || data.data || []
      const transformedLocks = locks.map(transformLockData)

      // If API doesn't support pagination, implement client-side pagination
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedLocks = transformedLocks.slice(startIndex, endIndex)

      const totalLocks = data.totalLocks || data.total || transformedLocks.length
      const totalPages = Math.ceil(totalLocks / limit)

      const result = {
        success: true,
        data: paginatedLocks,
        pagination: {
          page: page,
          limit: limit,
          total: totalLocks,
          totalPages: totalPages,
        },
        message: "Locks fetched successfully",
      }

      console.log("Processed result:", result)
      return result
    } catch (error) {
      console.error("Error fetching locks:", error)
      throw new Error(error instanceof Error ? error.message : "Failed to fetch locks")
    }
  },

  // Create new lock (Admin)
  createLock: async (lockData: CreateLockRequest): Promise<ApiResponse<Lock>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/locks/create`, {
        method: "POST",
        headers: createAuthHeaders(),
        body: JSON.stringify(lockData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Failed to create lock: ${response.statusText}`)
      }

      const data = await response.json()
      return {
        success: true,
        data: transformLockData(data.lock || data),
        message: data.message || "Lock created successfully",
      }
    } catch (error) {
      console.error("Error creating lock:", error)
      throw new Error(error instanceof Error ? error.message : "Failed to create lock")
    }
  },

  // Update lock (Admin)
  updateLock: async (lockId: string, lockData: UpdateLockRequest): Promise<ApiResponse<Lock>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/locks/edit/${lockId}`, {
        method: "PUT",
        headers: createAuthHeaders(),
        body: JSON.stringify(lockData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Failed to update lock: ${response.statusText}`)
      }

      const data = await response.json()
      return {
        success: true,
        data: transformLockData(data.lock || data),
        message: data.message || "Lock updated successfully",
      }
    } catch (error) {
      console.error("Error updating lock:", error)
      throw new Error(error instanceof Error ? error.message : "Failed to update lock")
    }
  },

  // Delete lock (Admin)
  deleteLock: async (lockId: string): Promise<ApiResponse<null>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/locks/delete/${lockId}`, {
        method: "DELETE",
        headers: createAuthHeaders(),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Failed to delete lock: ${response.statusText}`)
      }

      const data = await response.json().catch(() => ({}))
      return {
        success: true,
        data: null,
        message: data.message || "Lock deleted successfully",
      }
    } catch (error) {
      console.error("Error deleting lock:", error)
      throw new Error(error instanceof Error ? error.message : "Failed to delete lock")
    }
  },

 // Get active lock of the day (Public)
getActiveLock: async (): Promise<ApiResponse<Lock | null>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/locks/active-today`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return {
        success: false,
        data: null,
        message: errorData.message || `Failed to fetch active lock: ${response.statusText}`,
      }
    }

    const data = await response.json()

    if (!data?.lock) {
      return {
        success: false,
        data: null,
        message: "No active lock available today.",
      }
    }

    return {
      success: true,
      data: transformLockData(data.lock),
      message: data.message || "Active lock fetched successfully",
    }
  } catch (error) {
    console.error("Error fetching active lock:", error)
    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : "Failed to fetch active lock",
    }
  }
}

}
