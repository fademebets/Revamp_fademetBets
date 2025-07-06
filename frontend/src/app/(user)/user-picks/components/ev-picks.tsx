"use client"

import { useState, useEffect } from "react"
import { getCookie } from "cookies-next"
import { getActiveEvPicks } from "@/lib/ev-picks"
import { TrendingUp, Target, DollarSign, BarChart3, Calendar, Zap, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

export default function EVPicks() {
  const [evPicks, setEvPicks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [subscriptionActive, setSubscriptionActive] = useState(false)
  const [checkingSubscription, setCheckingSubscription] = useState(true)

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const token = getCookie("auth-token")

        if (!token) {
          toast.error("Authentication required")
          setCheckingSubscription(false)
          return
        }

        const response = await fetch("https://revamp-fademetbets.onrender.com/api/auth/subscription-status", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to check subscription status")
        }

        const data = await response.json()

        if (data.subscriptionStatus === "active") {
          setSubscriptionActive(true)
          // Fetch picks only if subscription is active
          fetchPicks()
        } else {
          toast.error("Your subscription is inactive or expired")
          setSubscriptionActive(false)
          setLoading(false)
        }
      } catch (error) {
        console.error("Subscription check failed:", error)
        toast.error("Failed to verify subscription status")
        setSubscriptionActive(false)
        setLoading(false)
      } finally {
        setCheckingSubscription(false)
      }
    }

    const fetchPicks = async () => {
      const { evs, message } = await getActiveEvPicks()
      if (evs.length === 0) {
        toast.info(message || "No EV picks available right now.")
      }
      setEvPicks(evs)
      setLoading(false)
    }

    checkSubscription()
  }, [])

  const getConfidenceColor = (confidence: string | number | undefined) => {
    const value = String(confidence).toLowerCase()
    switch (value) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-red-50 text-red-700 border-red-150"
      case "low":
        return "bg-red-25 text-red-600 border-red-100"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getOddsColor = (odds: number) => {
    return odds >= 0 ? "text-red-600" : "text-red-700"
  }

  if (checkingSubscription) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-700 text-lg font-semibold">
        Checking subscription status...
      </div>
    )
  }

  if (!subscriptionActive) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center py-16">
        <Zap className="h-16 w-16 text-red-600 mb-4" />
        <h2 className="text-3xl font-bold text-red-800 mb-2">Subscription Required</h2>
        <p className="text-red-700 text-lg mb-4 max-w-md">
          You need an active subscription to access EV Picks. Please upgrade your plan to continue.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-700 text-lg font-semibold">
        Loading EV Picks...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="h-8 w-8 text-red-600" />
            <h1 className="text-4xl font-bold text-red-900">EV Picks</h1>
          </div>
          <p className="text-red-700 text-lg">Expected Value plays with positive long-term profit potential</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full">
            <Star className="h-4 w-4 text-red-600" />
            <span className="text-red-800 font-medium">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Picks Grid */}
        {evPicks.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 bg-red-50 rounded-lg border border-red-100 shadow-inner">
            <Zap className="h-10 w-10 text-red-600 mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold text-red-800 mb-2">No EV Picks Available</h2>
            <p className="text-red-700 text-sm mb-4 max-w-sm">
              There are no active EV picks available at the moment. Check back later — new opportunities are updated
              throughout the day.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-6">
            {evPicks.map((pick, index) => (
              <Card
                key={pick._id || index}
                className="shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow duration-300"
              >
                <CardHeader className="bg-gradient-to-r py-5 from-red-600 to-red-700 text-white rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        EV Pick
                      </CardTitle>
                      <CardDescription className="text-red-100 mt-1">Pick #{index + 1}</CardDescription>
                    </div>
                    <Badge className={`${getConfidenceColor(pick.confidence)} text-xs font-semibold`}>
                      Confidence: {pick.confidence}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-red-800 mb-2 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Title
                    </h3>
                    <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                      <p className="text-lg font-bold text-red-900 text-center leading-tight">{pick.title}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                      <TrendingUp className="h-4 w-4 text-red-600 mx-auto mb-1" />
                      <h4 className="text-xs font-semibold text-red-700 mb-1">EV %</h4>
                      <p className="text-sm font-bold text-red-800 leading-tight">{pick.evValue}%</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border border-red-200">
                      <DollarSign className="h-4 w-4 text-red-600 mx-auto mb-1" />
                      <h4 className="text-xs font-semibold text-red-700 mb-1">Odds</h4>
                      <p className={`text-sm font-bold ${getOddsColor(pick.odds)}`}>{pick.odds}</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                      <BarChart3 className="h-4 w-4 text-red-600 mx-auto mb-1" />
                      <h4 className="text-xs font-semibold text-red-700 mb-1">Cover %</h4>
                      <p className="text-sm font-bold text-red-800">{pick.coverPercentage}%</p>
                    </div>
                  </div>
                  <Separator className="my-4 bg-red-200" />
                  <div>
                    <h3 className="text-sm font-semibold text-red-800 mb-3 flex items-center gap-1">
                      <BarChart3 className="h-4 w-4" />
                      Description
                    </h3>
                    <div className="bg-gradient-to-r from-red-50 to-white rounded-lg p-4 border-l-4 border-red-500">
                      <p className="text-red-900 text-sm leading-relaxed">{pick.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {evPicks.length > 0 && (
          <div className="mt-12 bg-white rounded-xl shadow-lg p-6 border border-red-100">
            <h2 className="text-2xl font-bold text-red-900 mb-6 text-center flex items-center justify-center gap-2">
              <Star className="h-6 w-6 text-red-600" />
              Today's EV Summary
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <h3 className="text-sm font-semibold text-red-700 mb-1">Total Picks</h3>
                <p className="text-2xl font-bold text-red-800">{evPicks.length}</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <h3 className="text-sm font-semibold text-red-700 mb-1">High Confidence</h3>
                <p className="text-2xl font-bold text-red-800">
                  {
                    evPicks.filter((pick) => {
                      const numericConfidence = Number.parseFloat(String(pick.confidence).replace("%", "")) || 0
                      return numericConfidence >= 80
                    }).length
                  }
                </p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <h3 className="text-sm font-semibold text-red-700 mb-1">Average EV%</h3>
                <p className="text-2xl font-bold text-red-800">
                  {(evPicks.reduce((sum, pick) => sum + (pick.evValue || 0), 0) / evPicks.length).toFixed(1)}%
                </p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <h3 className="text-sm font-semibold text-red-700 mb-1">Top Cover %</h3>
                <p className="text-2xl font-bold text-red-800">
                  {Math.max(...evPicks.map((pick) => pick.coverPercentage || 0))}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
