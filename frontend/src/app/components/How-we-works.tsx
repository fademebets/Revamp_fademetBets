"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  TrendingUp,
  Target,
  BarChart3,
  Users,
  ArrowRight,
  Star,
} from "lucide-react"
import { Link as ScrollLink } from "react-scroll"

export default function HowWeWorks() {
  const [chartHeights, setChartHeights] = useState<number[]>([])

  useEffect(() => {
    const heights = Array.from({ length: 15 }, () =>
      Math.floor(Math.random() * 60 + 30)
    )
    setChartHeights(heights)
  }, [])

  return (
    <section className="relative min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#fcdada]/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ffe2e2]/50 rounded-full blur-3xl"></div>

      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-red-500">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium text-red-600">
                Trusted by 10,000+ bettors
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span>FadeMeBets:</span>
                <span className="block bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                  Your Edge in Sports Betting
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 font-medium">
                Get daily +EV picks
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: <Target className="w-5 h-5 text-red-500" />,
                  label: "Bet with confidence",
                  bg: "bg-red-100",
                },
                {
                  icon: <BarChart3 className="w-5 h-5 text-red-700" />,
                  label: "Track profits over time",
                  bg: "bg-red-200",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div
                    className={`w-10 h-10 ${item.bg} rounded-lg flex items-center justify-center`}
                  >
                    {item.icon}
                  </div>
                  <span className="font-semibold">{item.label}</span>
                </div>
              ))}
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              At FadeMeBets, we deliver carefully curated, data-backed betting
              signals designed to help you beat the odds and grow your bankroll.
              Join a community of sharp bettors turning insights into income —
              one winning pick at a time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                asChild
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold"
              >
                <ScrollLink
                  to="subscription"
                  smooth={true}
                  duration={500}
                  offset={-50}
                  className="flex items-center cursor-pointer"
                >
                  Start Winning Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </ScrollLink>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-red-300 text-red-700 hover:bg-red-50 px-8 py-3 text-lg"
              >
                View Track Record
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">10,000+ Active Members</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-500" />
                <span className="text-gray-600">78% Win Rate</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gray-50 border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Monthly ROI</p>
                      <p className="text-2xl font-bold text-red-600">+24.5%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Win Streak</p>
                      <p className="text-2xl font-bold text-red-600">12</p>
                    </div>
                    <Target className="w-8 h-8 text-red-700" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-50 border border-gray-200">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">
                    Today&rsquo;s Featured Pick
                  </h3>
                  <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded">
                    +EV
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium">Lakers vs Warriors</p>
                      <p className="text-sm text-gray-500">Over 225.5 Points</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600">-110</p>
                      <p className="text-xs text-gray-500">
                        Expected Value: +12.3%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Confidence: High</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-50 border border-gray-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  30-Day Performance
                </h3>
                <div className="flex items-end justify-between h-24 gap-2">
                  {chartHeights.map((height, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-t from-red-600 to-red-400 rounded-t flex-1"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Consistent profits across all major sports
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
