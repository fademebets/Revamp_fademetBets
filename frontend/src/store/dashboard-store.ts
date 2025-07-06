import { create } from "zustand"
import { dashboardApi } from "@/lib/dashboard-api"
import type { DashboardState, TimeRange, DashboardMetrics } from "@/types/dashboard"

interface DashboardActions {
  setTimeRange: (timeRange: TimeRange) => void
  fetchChartData: (timeRange?: TimeRange) => Promise<void>
  fetchMetrics: () => Promise<void>
  fetchAllData: () => Promise<void>
}

export const useDashboardStore = create<DashboardState & DashboardActions>((set, get) => ({
  metrics: null,
  chartData: [],
  timeRange: "90d",
  isLoadingMetrics: false,
  isLoadingChart: false,
  error: null,

  setTimeRange: (timeRange: TimeRange) => {
    set({ timeRange })
    get().fetchChartData(timeRange)
  },

  fetchChartData: async (timeRange?: TimeRange) => {
    const currentTimeRange = timeRange || get().timeRange
    set({ isLoadingChart: true, error: null })

    try {
      const salesData = await dashboardApi.getSalesData(currentTimeRange)

      set({
        chartData: salesData.chartData,
        isLoadingChart: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch chart data",
        isLoadingChart: false,
      })
    }
  },

  fetchMetrics: async () => {
    set({ isLoadingMetrics: true, error: null })

    try {
      // Fetch total metrics (you can modify this to use a dedicated metrics API)
      const [totalSalesData, usersData] = await Promise.all([
        dashboardApi.getSalesData("90d"), // Always fetch 3 months for total metrics
        dashboardApi.getUsersData(),
      ])

      const metrics: DashboardMetrics = {
        totalUsers: usersData.totalUsers,
        totalSales: totalSalesData.totalSales,
        monthlySales: 7250, // You can calculate this from a separate API call
        yearlySales: 82500, // You can calculate this from a separate API call
        totalSubscriptions: totalSalesData.totalSubscriptions,
      }

      set({
        metrics,
        isLoadingMetrics: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch metrics",
        isLoadingMetrics: false,
      })
    }
  },

  fetchAllData: async () => {
    // Fetch metrics and initial chart data
    await Promise.all([get().fetchMetrics(), get().fetchChartData()])
  },
}))
