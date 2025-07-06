export interface ChartDataPoint {
  date: string
  total: number
  subscriptions: number
}

export interface SalesApiResponse {
  chartData: ChartDataPoint[]
  totalSales: number
  totalSubscriptions: number
}

export interface DashboardMetrics {
  totalUsers: number
  totalSales: number
  monthlySales: number
  yearlySales: number
  totalSubscriptions: number
}

export type TimeRange = "7d" | "30d" | "90d"

export interface DashboardState {
  // Metrics data - doesn't change with time range
  metrics: DashboardMetrics | null

  // Chart data - changes with time range
  chartData: ChartDataPoint[]
  timeRange: TimeRange

  // Loading states
  isLoadingMetrics: boolean
  isLoadingChart: boolean

  error: string | null
}
