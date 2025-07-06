"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Download, Maximize2, RefreshCw, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SalesAndUserChart } from "../dashboard/_components/SalesAndUserChart"
import { useDashboardStore } from "@/store/dashboard-store"
import Link from "next/link"

export default function AnalyticsPage() {
  const { metrics, chartData, timeRange, isLoadingChart, isLoadingMetrics, fetchAllData } = useDashboardStore()
  const [time, setTime] = useState('');

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);

  useEffect(() => {
    fetchAllData()
  }, [fetchAllData])

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const getTimeRangeText = () => {
    switch (timeRange) {
      case "7d":
        return "Last 7 Days"
      case "30d":
        return "Last 30 Days"
      case "90d":
        return "Last 3 Months"
      default:
        return "Last 3 Months"
    }
  }

  const getTotalSalesForPeriod = () => {
    if (!chartData.length) return 0
    return chartData.reduce((sum, item) => sum + item.total, 0)
  }

  const getTotalSubscriptionsForPeriod = () => {
    if (!chartData.length) return 0
    return chartData.reduce((sum, item) => sum + item.subscriptions, 0)
  }

  const getAverageDailySales = () => {
    if (!chartData.length) return 0
    return getTotalSalesForPeriod() / chartData.length
  }

  const handleRefresh = () => {
    fetchAllData()
  }

  const handleExport = () => {
    // Implement export functionality
    const dataStr = JSON.stringify(chartData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `sales-analytics-${timeRange}-${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-100">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">Sales Analytics</h1>
                  <p className="text-gray-600">Detailed view of your sales performance and subscription trends</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoadingChart || isLoadingMetrics}
                className="gap-2 bg-transparent"
              >
                <RefreshCw className={`h-4 w-4 ${isLoadingChart || isLoadingMetrics ? "animate-spin" : ""}`} />
                Refresh
              </Button>

              <Button variant="outline" size="sm" onClick={handleExport} className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export Data
              </Button>

              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Maximize2 className="h-4 w-4" />
                Fullscreen
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-medium">Period Sales</CardDescription>
              <CardTitle className="text-2xl font-bold">{formatCurrency(getTotalSalesForPeriod())}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {getTimeRangeText()}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-medium">Period Subscriptions</CardDescription>
              <CardTitle className="text-2xl font-bold">{getTotalSubscriptionsForPeriod().toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {getTimeRangeText()}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-medium">Avg. Daily Sales</CardDescription>
              <CardTitle className="text-2xl font-bold">{formatCurrency(getAverageDailySales())}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  Daily Average
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-medium">Data Points</CardDescription>
              <CardTitle className="text-2xl font-bold">{chartData.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                  Days Tracked
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chart Section */}
        <div className="mb-8">
          <SalesAndUserChart />
        </div>

        {/* Additional Insights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Insights</CardTitle>
              <CardDescription>Key metrics and trends from your data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-800">Best Sales Day</p>
                  <p className="text-xs text-green-600">
                    {chartData.length > 0
                      ? new Date(
                          chartData.reduce((max, item) => (item.total > max.total ? item : max), chartData[0])?.date ||
                            "",
                        ).toLocaleDateString()
                      : "No data"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-800">
                    {chartData.length > 0 ? formatCurrency(Math.max(...chartData.map((item) => item.total))) : "$0.00"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-800">Best Subscription Day</p>
                  <p className="text-xs text-blue-600">
                    {chartData.length > 0
                      ? new Date(
                          chartData.reduce(
                            (max, item) => (item.subscriptions > max.subscriptions ? item : max),
                            chartData[0],
                          )?.date || "",
                        ).toLocaleDateString()
                      : "No data"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-800">
                    {chartData.length > 0
                      ? Math.max(...chartData.map((item) => item.subscriptions)).toLocaleString()
                      : "0"}{" "}
                    subs
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-purple-800">Revenue per Subscription</p>
                  <p className="text-xs text-purple-600">Average across period</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-purple-800">
                    {getTotalSubscriptionsForPeriod() > 0
                      ? formatCurrency(getTotalSalesForPeriod() / getTotalSubscriptionsForPeriod())
                      : "$0.00"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data Summary</CardTitle>
              <CardDescription>Overview of your analytics data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Time Period</span>
                  <Badge variant="outline">{getTimeRangeText()}</Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Data Points</span>
                  <span className="font-medium">{chartData.length} days</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Date Range</span>
                  <span className="font-medium text-sm">
                    {chartData.length > 0
                      ? `${new Date(chartData[chartData.length - 1]?.date || "").toLocaleDateString()} - ${new Date(chartData[0]?.date || "").toLocaleDateString()}`
                      : "No data"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="font-medium text-sm">{time}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-gray-500 leading-relaxed">
                  This analytics view provides detailed insights into your sales performance and subscription trends.
                  Use the time range selector in the chart to analyze different periods and identify patterns in your
                  data.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
