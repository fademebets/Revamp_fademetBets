"use client"

import { useEffect, useState, useRef } from "react"
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"

const fullData = [
  {
    subject: "Dental Filling",
    A: 80,
    fullMark: 100,
  },
  {
    subject: "Dental Scaling",
    A: 98,
    fullMark: 100,
  },
  {
    subject: "Root Canal",
    A: 86,
    fullMark: 100,
  },
  {
    subject: "Dental Brace",
    A: 70,
    fullMark: 100,
  },
  {
    subject: "Denture Placement",
    A: 65,
    fullMark: 100,
  },
  {
    subject: "Bleaching",
    A: 85,
    fullMark: 100,
  },
]

// Simplified data for small screens
const smallData = [
  {
    subject: "Filling",
    A: 80,
    fullMark: 100,
  },
  {
    subject: "Scaling",
    A: 98,
    fullMark: 100,
  },
  {
    subject: "Root Canal",
    A: 86,
    fullMark: 100,
  },
  {
    subject: "Brace",
    A: 70,
    fullMark: 100,
  },
]

// Extra simplified data for very small screens
const tinyData = [
  {
    subject: "Fill",
    A: 80,
    fullMark: 100,
  },
  {
    subject: "Scale",
    A: 98,
    fullMark: 100,
  },
  {
    subject: "Root",
    A: 86,
    fullMark: 100,
  },
]

export function RadarChart() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const [chartData, setChartData] = useState(fullData)

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth
        setContainerWidth(width)

        // Set height based on width for aspect ratio
        const height = width < 400 ? 180 : width < 600 ? 200 : 240
        setContainerHeight(height)

        // Choose appropriate data based on screen size
        if (width < 300) {
          setChartData(tinyData)
        } else if (width < 500) {
          setChartData(smallData)
        } else {
          setChartData(fullData)
        }
      }
    }

    // Initial update
    updateDimensions()

    // Update on resize
    window.addEventListener("resize", updateDimensions)

    // Cleanup
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Calculate appropriate font size and outer radius
  const fontSize = containerWidth < 350 ? 8 : containerWidth < 500 ? 10 : 12
  const outerRadius = containerWidth < 350 ? "60%" : containerWidth < 500 ? "70%" : "80%"

  return (
    <div className="h-auto" ref={containerRef}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm font-medium">Treatment Types</div>
        <div className="flex items-center gap-4">
          <button className="text-xs text-blue-600 underline">This week</button>
          <button className="text-xs text-muted-foreground">Last week</button>
        </div>
      </div>

      <div style={{ width: "100%", height: containerHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart cx="50%" cy="50%" outerRadius={outerRadius} data={chartData}>
            <PolarGrid gridType="polygon" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{
                fontSize: fontSize,
                fill: "#888888",
              }}
            />
            <PolarRadiusAxis
              tick={{
                fontSize: fontSize,
                fill: "#888888",
              }}
              tickCount={4}
              angle={containerWidth < 350 ? 45 : 30}
            />
            <Tooltip contentStyle={{ fontSize: "12px" }} />
            <Radar name="Demand" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            <Legend wrapperStyle={{ fontSize: fontSize }} iconSize={10} />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

