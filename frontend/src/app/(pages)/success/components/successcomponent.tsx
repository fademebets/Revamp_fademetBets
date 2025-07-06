"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SubscriptionResponse {
  message: string
  subscriptionStatus: string
  subscriptionEndDate: string
  token: string
}

export default function SubscriptionSuccess() {
  const [isLoading, setIsLoading] = useState(true)
  const [subscriptionResult, setSubscriptionResult] = useState<SubscriptionResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const sessionId = searchParams.get("session_id")

    if (sessionId) {
      confirmSubscription(sessionId)
    } else {
      setError("No session ID found")
      setIsLoading(false)
    }
  }, [searchParams])

  const confirmSubscription = async (sessionId: string) => {
    try {
      const response = await fetch("https://revamp-fademetbets.onrender.com/api/subscription/confirm-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to confirm subscription")
      }

      const result = await response.json()
      setSubscriptionResult(result)

      // Store the JWT token
      if (result.token) {
        localStorage.setItem("authToken", result.token)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to confirm subscription")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <section className="relative bg-white text-slate-900 py-8 sm:py-12 lg:py-16 xl:py-24">
        <div className="relative w-full max-w-md mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold">Confirming Your Subscription</h2>
              <p className="text-slate-600">Please wait while we process your payment...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative bg-white text-slate-900 py-8 sm:py-12 lg:py-16 xl:py-24">
        <div className="relative w-full max-w-md mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold">Payment Error</h2>
              <p className="text-slate-600">{error}</p>
            </div>
            <Button
              onClick={() => (window.location.href = "/subscription")}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Try Again
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative bg-white text-slate-900 py-8 sm:py-12 lg:py-16 xl:py-24">
      <div className="relative w-full max-w-2xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Payment Successful!</h2>
            <p className="text-slate-600">{subscriptionResult?.message}</p>
          </div>
          {subscriptionResult && (
            <Card className="text-left">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Status:</span>
                  <span className="font-semibold text-green-600 capitalize">
                    {subscriptionResult.subscriptionStatus}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Valid Until:</span>
                  <span className="font-semibold">
                    {new Date(subscriptionResult.subscriptionEndDate).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
          <div className="space-y-3">
            <Button
              onClick={() => (window.location.href = "/dashboard")}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Go to Dashboard
            </Button>
            <Button
              onClick={() => (window.location.href = "/subscription")}
              variant="outline"
              className="w-full bg-transparent"
            >
              Subscribe to Another Plan
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
