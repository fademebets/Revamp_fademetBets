"use client"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DotLegend } from "@/components/ui/DotLegend"
import { Skeleton } from "@/components/ui/skeleton"
import { useDashboardStore } from "@/store/dashboard-store"
import type { TimeRange } from "@/types/dashboard"

const legendItems = [
  { color: "#29bca3", label: "Sales" },
  { color: "var(--chart-1)", label: "Subscriptions" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  total: {
    label: "Sales",
    color: "var(--chart-2)",
  },
  subscriptions: {
    label: "Subscriptions",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

function ChartSkeleton() {
  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-9 w-[160px] rounded-lg" />
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="aspect-auto h-[250px] w-full">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
    </Card>
  )
}

export function SalesAndUserChart() {
  const { chartData, timeRange, setTimeRange, isLoadingChart, error } = useDashboardStore()

  const getTimeRangeLabel = (range: TimeRange) => {
    switch (range) {
      case "7d":
        return "Last 7 days"
      case "30d":
        return "Last 30 days"
      case "90d":
        return "Last 3 months"
      default:
        return "Last 3 months"
    }
  }

  const getDescription = () => {
    const period = timeRange === "7d" ? "week" : timeRange === "30d" ? "month" : "3 months"
    return `Showing total sales and subscriptions for the last ${period}`
  }

  if (isLoadingChart) {
    return <ChartSkeleton />
  }

  if (error) {
    return (
      <Card className="pt-0">
        <CardHeader>
          <CardTitle>Error Loading Chart</CardTitle>
          <CardDescription className="text-red-500">{error}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Sales & Subscriptions Chart</CardTitle>
          <CardDescription>{getDescription()}</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
          <SelectTrigger className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex" aria-label="Select a value">
            <SelectValue placeholder={getTimeRangeLabel(timeRange)} />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-total)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-total)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillSubscriptions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-subscriptions)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-subscriptions)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) {
                  return null
                }

                const data = payload[0]?.payload
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          {new Date(data.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div
                            className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-[0.70rem] text-muted-foreground">
                            {entry.dataKey === "total" ? "Sales" : "Subscriptions"}:
                          </span>
                          <span className="font-mono text-[0.70rem] font-medium text-zinc-700 tabular-nums">
                            {entry.dataKey === "total"
                              ? `$${Number(entry.value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                              : Number(entry.value).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }}
            />
            <Area dataKey="total" type="natural" fill="url(#fillTotal)" stroke="var(--color-total)" stackId="a" />
            <Area
              dataKey="subscriptions"
              type="natural"
              fill="url(#fillSubscriptions)"
              stroke="var(--color-subscriptions)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
        <DotLegend items={legendItems} className="mt-4 justify-center" />
      </CardContent>
    </Card>
  )
}
