import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

interface MetricCardProps {
  title: string
  value: string
  change: string
  description: string
  icon: React.ReactNode
    iconBgColor: string

}

export function MetricCard({ title, value, change, description, icon, iconBgColor }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
      <div className={`p-2 rounded-md ${iconBgColor}`}>
        {icon}
      </div>
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </div>

      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold sm:text-2xl">{value}</div>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-green-100 text-green-800">
            {change}
          </Badge>

        </div>
       <div className="mt-2 flex ">
       <CardDescription className="text-xs sm:text-sm">{description}</CardDescription>
       </div>

      </CardContent>
    </Card>
  )
}
