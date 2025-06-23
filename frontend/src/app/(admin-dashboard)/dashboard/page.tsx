"use client"

import {
  Calendar,
  ChevronDown,
  Download,
  Filter,
  Users2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "./_components/metric-card"
import { SalesAndUserChart } from "./_components/SalesAndUserChart"
import { UserTable } from "./_components/UserTable"

export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Dashboard Overview</h1>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
              Get a quick snapshot of your key performance metrics and sales trends.
          </p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span className="xs:inline">Day</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="sm"
            className="h-8 gap-1 px-5 bg-[#D92A1B] text-white hover:bg-ebony transition-colors duration-300 ease-in-out"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="xs:inline">Export</span>
          </Button>
        </div>
      </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  <MetricCard
    title="Total Users"
    value="5,430"
    change="+8%"
    description="User growth in the last 30 days."
      iconBgColor="bg-blue-50"
    icon={
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    }
  />
  <MetricCard
    title="Total Sales"
    value="$82,500"
    change="+14%"
    description="Sales total in the last year."
      iconBgColor="bg-green-50"

    icon={
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 8c-1.38 0-2.5.9-2.5 2s1.12 2 2.5 2 2.5.9 2.5 2-1.12 2-2.5 2M12 8v8" />
        <path d="M5 12h14" />
      </svg>
    }
  />
  <MetricCard
    title="Monthly Sales"
    value="$7,250"
    change="+4.2%"
    description="Compared to last month."
      iconBgColor="bg-purple-50"

    icon={
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M3 3v18h18" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
      </svg>
    }
  />
  <MetricCard
    title="Yearly Sales"
    value="$82,500"
    change="+10.5%"
    description="Compared to last year."
      iconBgColor="bg-orange-50"

    icon={
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 20h9" />
        <path d="M16 20V10" />
        <path d="M8 20V4" />
      </svg>
    }
  />
</div>

      <div className="grid gap-4">
            <SalesAndUserChart />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-gray-200">
            <Users2 className="h-4 w-4 text-gray-800" />
          </div>
            <CardTitle className="text-sm font-medium">User</CardTitle>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Calendar</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <UserTable />
        </CardContent>
      </Card>
    </>
  )
}
