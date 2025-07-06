import type { SalesApiResponse, TimeRange } from "@/types/dashboard"

const API_BASE_URL = "http://localhost:5000/api"

export const dashboardApi = {
  async getSalesData(timeRange: TimeRange): Promise<SalesApiResponse> {
    const endpoint = timeRange === "7d" ? "7days" : timeRange === "30d" ? "30days" : "3months"

    const response = await fetch(`${API_BASE_URL}/sales/${endpoint}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch sales data: ${response.statusText}`)
    }

    return response.json()
  },

  async getUsersData(): Promise<{ totalUsers: number }> {
    // Placeholder for users API - replace with actual endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ totalUsers: 5430 })
      }, 1000)
    })
  },

  // Method to refresh all metrics (call this when new data is added)
  async refreshMetrics(): Promise<void> {
    // This would be called when you know new data has been added to the API
    // You can call this from anywhere in your app when data changes
  },
}
