"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { setCookie } from "cookies-next"
import { Loader2, CheckCircle, AlertCircle, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SubscriptionResponse {
  message: string
  subscriptionStatus: string
  subscriptionEndDate: string
  token: string
  role: string
}

export default function SubscriptionSuccess() {
  const [isLoading, setIsLoading] = useState(true)
  const [subscriptionResult, setSubscriptionResult] = useState<SubscriptionResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const searchParams = useSearchParams()

  useEffect(() => {
    const sessionIdFromUrl = searchParams.get("session_id")
    console.log("Session ID from URL:", sessionIdFromUrl) // Debug log
    if (sessionIdFromUrl) {
      setSessionId(sessionIdFromUrl)
      confirmSubscription(sessionIdFromUrl)
    } else {
      setError("No session ID found in URL")
      setIsLoading(false)
    }
  }, [searchParams])

  const confirmSubscription = async (sessionId: string, isRetry = false) => {
    if (!isRetry) {
      setIsLoading(true)
      setError(null)
    }

    try {
      console.log("Making API call with session ID:", sessionId) // Debug log
      // Add timeout to the fetch request
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      const response = await fetch("https://revamp-fademetbets-backend.onrender.com/api/subscription/confirm-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      console.log("API Response status:", response.status) // Debug log

      if (!response.ok) {
        const errorText = await response.text()
        console.error("API Error:", errorText) // Debug log
        throw new Error(`Failed to confirm subscription: ${response.status} - ${errorText}`)
      }

      const result = await response.json()
      console.log("API Response:", result) // Debug log
      setSubscriptionResult(result)

      // Store the JWT token, role, and subscription status in cookies
      if (result.token) {
        setCookie("auth-token", result.token, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        })
        console.log("Token stored successfully in cookies") // Debug log
      }

      if (result.role) {
        setCookie("user-role", result.role, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        })
        console.log("Role stored successfully in cookies") // Debug log
      }

      if (result.subscriptionStatus) {
        setCookie("subscription-status", result.subscriptionStatus, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        })
        console.log("Subscription status stored successfully in cookies") // Debug log
      }
    } catch (err) {
      console.error("Subscription confirmation error:", err) // Debug log
      if (err instanceof Error) {
        if (err.name === "AbortError") {
          setError("Request timed out. Please try again.")
        } else {
          setError(err.message)
        }
      } else {
        setError("Failed to confirm subscription. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleRetry = () => {
    if (sessionId) {
      setRetryCount((prev) => prev + 1)
      confirmSubscription(sessionId, true)
    }
  }

  const handleGoHome = () => {
    window.location.href = "/"
  }

  const handleGoToDashboard = () => {
    window.location.href = "/userProfile"
  }

  const handleSubscribeAgain = () => {
    window.location.href = "/"
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
              {retryCount > 0 && <p className="text-sm text-slate-500">Retry attempt: {retryCount}</p>}
            </div>
            {sessionId && <div className="text-xs text-slate-400 break-all">Session ID: {sessionId}</div>}
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
              <h2 className="text-2xl sm:text-3xl font-bold">Payment Confirmation Error</h2>
              <p className="text-slate-600">{error}</p>
              {sessionId && <div className="text-xs text-slate-400 break-all mt-4">Session ID: {sessionId}</div>}
            </div>
            <div className="space-y-3">
              <Button
                onClick={handleRetry}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={!sessionId}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button onClick={handleSubscribeAgain} variant="outline" className="w-full bg-transparent">
                Back to Subscription
              </Button>
              <Button onClick={handleGoHome} variant="ghost" className="w-full">
                Go Home
              </Button>
            </div>
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
                {subscriptionResult.role && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Role:</span>
                    <span className="font-semibold capitalize">{subscriptionResult.role}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          <div className="space-y-3">
            <Button onClick={handleGoToDashboard} className="w-full bg-red-600 hover:bg-red-700 text-white">
              Go to Dashboard
            </Button>
            <Button onClick={handleSubscribeAgain} variant="outline" className="w-full bg-transparent">
              Subscribe to Another Plan
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
