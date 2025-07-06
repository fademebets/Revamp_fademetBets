"use client"

import { useState, useEffect } from "react"
import { getCookie } from "cookies-next"
import { lockApi } from "@/lib/lockofthedayApi"
import { TrendingUp, Target, DollarSign, BarChart3, Calendar, Trophy } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

export default function LockOfTheDay() {
  const [lock, setLock] = useState<any | null>(null)
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
          // Fetch lock only if subscription is active
          fetchLock()
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

    const fetchLock = async () => {
      try {
        const { data } = await lockApi.getActiveLock()
        setLock(data)
      } catch (error) {
        console.error("Failed to fetch Lock of the Day", error)
        setLock(null)
      } finally {
        setLoading(false)
      }
    }

    checkSubscription()
  }, [])

  const getConfidenceColor = (confidence: string) => {
    const value = confidence?.toLowerCase()
    switch (value) {
      case "high":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
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
        <Trophy className="h-16 w-16 text-red-600 mb-4" />
        <h2 className="text-3xl font-bold text-red-800 mb-2">Subscription Required</h2>
        <p className="text-red-700 text-lg mb-4 max-w-md">
          You need an active subscription to access Lock of the Day. Please upgrade your plan to continue.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-700 text-lg font-semibold">
        Loading Lock of the Day...
      </div>
    )
  }

  if (!lock) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <Trophy className="h-12 w-12 text-red-600 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">No Lock of the Day Available</h2>
        <p className="text-slate-600">Please check back later for today's premium pick.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="h-8 w-8 text-red-600" />
            <h1 className="text-4xl font-bold text-slate-900">Lock of the Day</h1>
          </div>
          <p className="text-slate-600 text-lg">Today's premium betting pick with expert analysis</p>
        </div>

        {/* Main Card */}
        <Card className="shadow-2xl border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-red-600 py-5 to-red-800 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Target className="h-6 w-6" />
                  {lock.sport}
                </CardTitle>
                <CardDescription className="text-red-100 text-lg mt-1">
                  {new Date(lock.createdDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </div>
              <div className="text-right">
                <Badge className={`${getConfidenceColor(lock.confidence)} text-sm font-semibold`}>
                  {lock.confidence} Confidence
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            {/* Game Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-red-600" />
                Matchup
              </h3>
              <div className="bg-red-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-slate-900 text-center">{lock.game}</p>
              </div>
            </div>

            {/* Pick Details */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-slate-700 mb-1">The Pick</h4>
                <p className="text-lg font-bold text-red-700">{lock.pick}</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-6 w-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-slate-700 mb-1">Odds</h4>
                <p className="text-lg font-bold text-red-700">{lock.odds}</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center justify-center mb-2">
                  <BarChart3 className="h-6 w-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-slate-700 mb-1">Units</h4>
                <p className="text-lg font-bold text-red-700">{lock.units} Units</p>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Analysis Section */}
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-red-600" />
                Expert Analysis
              </h3>
              <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-600">
                <p className="text-slate-700 leading-relaxed text-lg">{lock.analysis}</p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-red-100 rounded-lg border border-red-200">
              <p className="text-sm text-red-800 text-center">
                <strong>Disclaimer:</strong> Gambling involves risk. Please bet responsibly and within your means. This
                is for entertainment purposes only.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
