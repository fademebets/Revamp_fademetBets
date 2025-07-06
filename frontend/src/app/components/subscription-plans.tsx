"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Check,
  Star,
  Zap,
  Crown,
  TrendingUp,
  Bell,
  Users,
  BarChart3,
  Shield,
  Loader2,
  CheckCircle,
  AlertCircle,
  CreditCard,
} from "lucide-react"

type PlanType = "monthly" | "quarterly" | "yearly"

interface SubscriptionResponse {
  message: string
  subscriptionStatus: string
  subscriptionEndDate: string
  token: string
}

// Declare Stripe global type
declare global {
  interface Window {
    Stripe: any
  }
}

export default function SubscriptionPlan() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)
  const [email, setEmail] = useState("")
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [subscriptionResult, setSubscriptionResult] = useState<SubscriptionResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<"select" | "email" | "processing" | "success">("select")
  const [stripe, setStripe] = useState<any>(null)
  const [stripeLoading, setStripeLoading] = useState(true)
  const [stripeError, setStripeError] = useState<string | null>(null)

  const plans = [
    {
      id: 1,
      name: "Starter",
      price: "$2.99",
      period: "/month",
      planType: "monthly" as PlanType,
      description: "Perfect for beginners getting started",
      features: [
        "5 daily +EV picks",
        "Basic analytics dashboard",
        "Email notifications",
        "Community access",
        "Mobile app access",
        "Basic bankroll tracking",
      ],
      cta: "Get Starter",
      popular: false,
      icon: <TrendingUp className="w-5 h-5" />,
      gradient: "from-red-500 to-red-600",
    },
    {
      id: 2,
      name: "Premium",
      badge: "Most Popular",
      price: "$7.99",
      period: "/quarter",
      planType: "quarterly" as PlanType,
      description: "Best balance of features and value",
      features: [
        "15 daily +EV picks",
        "Advanced analytics & insights",
        "Instant push notifications",
        "Priority community access",
        "Live chat support",
        "Advanced bankroll management",
        "Weekly strategy sessions",
        "Historical performance data",
      ],
      cta: "Get Premium",
      popular: true,
      icon: <Star className="w-5 h-5" />,
      gradient: "from-red-600 to-red-700",
    },
    {
      id: 3,
      name: "Pro",
      badge: "Best Value",
      price: "$29.99",
      period: "/year",
      planType: "yearly" as PlanType,
      description: "Maximum value for serious bettors",
      features: [
        "Unlimited daily +EV picks",
        "Premium analytics suite",
        "Real-time notifications",
        "VIP community access",
        "1-on-1 strategy consultations",
        "Professional bankroll tools",
        "Weekly live sessions",
        "Custom betting strategies",
        "Priority customer support",
        "Exclusive market insights",
      ],
      cta: "Go Pro",
      popular: false,
      icon: <Crown className="w-5 h-5" />,
      gradient: "from-red-700 to-red-800",
    },
  ]

  const features = [
    { icon: <BarChart3 className="w-4 h-4" />, text: "Data-driven picks" },
    { icon: <Bell className="w-4 h-4" />, text: "Real-time alerts" },
    { icon: <Users className="w-4 h-4" />, text: "Community access" },
    { icon: <Shield className="w-4 h-4" />, text: "Risk management" },
  ]

  // Load Stripe on component mount with better error handling
  useEffect(() => {
    const loadStripe = async () => {
      try {
        setStripeLoading(true)
        setStripeError(null)

        // Check if environment variable exists
        const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        if (!publishableKey) {
          throw new Error("Stripe publishable key is not configured")
        }

        if (window.Stripe) {
          const stripeInstance = window.Stripe(publishableKey)
          setStripe(stripeInstance)
        } else {
          // Load Stripe script
          const script = document.createElement("script")
          script.src = "https://js.stripe.com/v3/"
          script.async = true

          script.onload = () => {
            try {
              const stripeInstance = window.Stripe(publishableKey)
              setStripe(stripeInstance)
            } catch (err) {
              console.error("Failed to initialize Stripe:", err)
              setStripeError("Failed to initialize payment system")
            }
          }

          script.onerror = () => {
            console.error("Failed to load Stripe script")
            setStripeError("Failed to load payment system")
          }

          document.head.appendChild(script)
        }
      } catch (err) {
        console.error("Stripe loading error:", err)
        setStripeError(err instanceof Error ? err.message : "Failed to load payment system")
      } finally {
        setStripeLoading(false)
      }
    }

    loadStripe()

    // Check for successful payment return from Stripe
    const urlParams = new URLSearchParams(window.location.search)
    const sessionId = urlParams.get("session_id")
    const success = urlParams.get("success")
    if (success === "true" && sessionId) {
      handleStripeReturn(sessionId)
    }
  }, [])

  const handleStripeReturn = useCallback(async (sessionId: string) => {
    setIsLoading(true)
    setStep("processing")
    try {
      const subscriptionResponse = await confirmSubscription(sessionId)
      setSubscriptionResult(subscriptionResponse)
      setStep("success")
      // Store the JWT token
      if (subscriptionResponse.token) {
        localStorage.setItem("authToken", subscriptionResponse.token)
      }
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to confirm subscription")
      setStep("select")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handlePlanSelect = (planType: PlanType) => {
    setSelectedPlan(planType)
    setStep("email")
    setError(null)
  }

  const createCheckoutSession = async (email: string, plan: PlanType) => {
    const response = await fetch("https://revamp-fademetbets.onrender.com/api/subscription/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        plan,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || "Failed to create checkout session")
    }

    return response.json()
  }

  const confirmSubscription = async (sessionId: string) => {
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
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || "Failed to confirm subscription")
    }

    return response.json()
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !selectedPlan) {
      setError("Please provide email and select a plan")
      return
    }

    // Check if Stripe failed to load
    if (stripeError) {
      setError(`Payment system error: ${stripeError}. Please refresh the page and try again.`)
      return
    }

    if (stripeLoading) {
      setError("Payment system is still loading. Please wait a moment and try again.")
      return
    }

    if (!stripe) {
      setError("Payment system is not available. Please refresh the page and try again.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Create checkout session
      const checkoutResponse = await createCheckoutSession(email, selectedPlan)
      const { sessionId } = checkoutResponse

      if (!sessionId) {
        throw new Error("Invalid checkout session")
      }

      // Redirect to Stripe Checkout
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }
    } catch (err) {
      console.error("Checkout error:", err)
      setError(err instanceof Error ? err.message : "An error occurred during checkout")
      setIsLoading(false)
    }
  }

  const resetFlow = () => {
    setStep("select")
    setSelectedPlan(null)
    setEmail("")
    setError(null)
    setSubscriptionResult(null)
  }

  if (step === "success" && subscriptionResult) {
    return (
      <section className="relative bg-white text-slate-900 py-8 sm:py-12 lg:py-16 xl:py-24 overflow-hidden">
        <div className="relative w-full max-w-2xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Payment Successful!</h2>
              <p className="text-slate-600">{subscriptionResult.message}</p>
            </div>
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
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Plan:</span>
                  <span className="font-semibold capitalize">{selectedPlan}</span>
                </div>
              </CardContent>
            </Card>
            <div className="space-y-3">
              <Button
                onClick={() => (window.location.href = "/dashboard")}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Go to Dashboard
              </Button>
              <Button onClick={resetFlow} variant="outline" className="w-full bg-transparent">
                Subscribe to Another Plan
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (step === "email") {
    const selectedPlanDetails = plans.find((p) => p.planType === selectedPlan)

    return (
      <section className="relative bg-white text-slate-900 py-8 sm:py-12 lg:py-16 xl:py-24 overflow-hidden">
        <div className="relative w-full max-w-md mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="text-center mb-8 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold">Complete Your Subscription</h2>
            {selectedPlanDetails && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {selectedPlanDetails.icon}
                  <span className="font-semibold">{selectedPlanDetails.name}</span>
                </div>
                <div className="text-2xl font-bold text-red-600">
                  {selectedPlanDetails.price}
                  <span className="text-sm text-slate-600">{selectedPlanDetails.period}</span>
                </div>
              </div>
            )}
          </div>

          {/* Show Stripe loading status */}
          {stripeLoading && (
            <Alert className="mb-6 border-blue-200 bg-blue-50">
              <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
              <AlertDescription className="text-blue-800">Loading payment system...</AlertDescription>
            </Alert>
          )}

          {/* Show Stripe error */}
          {stripeError && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {stripeError}
                <Button
                  variant="link"
                  className="p-0 h-auto ml-2 text-red-600 underline"
                  onClick={() => window.location.reload()}
                >
                  Refresh page
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Show general error */}
          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubscribe} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={isLoading || !email.trim() || stripeLoading || !!stripeError}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Redirecting to Payment...
                  </>
                ) : stripeLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading Payment System...
                  </>
                ) : stripeError ? (
                  "Payment System Unavailable"
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Continue to Payment
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={resetFlow}
                className="w-full bg-transparent"
                disabled={isLoading}
              >
                Back to Plans
              </Button>
            </div>

            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Shield className="w-3 h-3" />
                <span>Secured by Stripe</span>
              </div>
              <p className="text-xs text-slate-500">
                By continuing, you agree to our Terms of Service and Privacy Policy. You can cancel anytime.
              </p>
            </div>
          </form>
        </div>
      </section>
    )
  }

  if (step === "processing") {
    return (
      <section className="relative bg-white text-slate-900 py-8 sm:py-12 lg:py-16 xl:py-24 overflow-hidden">
        <div className="relative w-full max-w-md mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold">Processing Your Payment</h2>
              <p className="text-slate-600">Please wait while we confirm your subscription...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative bg-white text-slate-900 py-8 sm:py-12 lg:py-16 xl:py-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-red-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-red-500/5 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 space-y-4 sm:space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-600 text-sm font-medium">
            <Zap className="w-4 h-4" />
            Choose Your Edge
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight px-2">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-xl mx-auto px-4">
            Join thousands of profitable bettors with our proven strategies. Choose your plan and start winning.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-4 mt-6 px-2">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-700 text-xs sm:text-sm">
                <div className="text-red-500 flex-shrink-0">{feature.icon}</div>
                <span className="truncate">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-none">
            {plans.map((plan) => (
              <div key={plan.id} className="w-full min-w-0">
                <Card
                  className={`relative group transition-all duration-300 hover:scale-[1.02] w-full h-full cursor-pointer ${
                    plan.popular
                      ? "bg-red-600 text-white border-red-500 shadow-xl"
                      : "bg-white text-slate-900 border-slate-200 shadow-md"
                  }`}
                  onMouseEnter={() => setHoveredPlan(plan.id)}
                  onMouseLeave={() => setHoveredPlan(null)}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-white text-red-600 px-2 sm:px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                      {plan.badge}
                    </div>
                  )}

                  <CardHeader className="text-center space-y-3 sm:space-y-4 p-4 sm:p-6">
                    <div
                      className={`mx-auto w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl ${
                        plan.popular ? "bg-white/10" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {plan.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold">{plan.name}</h3>
                    <p className="text-xs sm:text-sm leading-relaxed px-2">{plan.description}</p>
                    <div className="space-y-1">
                      <div>
                        <span className="text-2xl sm:text-3xl font-bold">{plan.price}</span>
                        <span className="text-xs sm:text-sm ml-1">{plan.period}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
                    <div className="space-y-2 sm:space-y-3">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 sm:gap-3">
                          <Check
                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? "text-white" : "text-red-600"}`}
                          />
                          <span className="text-xs sm:text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => handlePlanSelect(plan.planType)}
                      className={`w-full text-sm sm:text-base font-semibold py-2 sm:py-3 ${
                        plan.popular
                          ? "bg-white text-red-600 hover:bg-red-50"
                          : "bg-white text-red-600 border border-red-200 hover:bg-red-50"
                      }`}
                    >
                      {plan.cta}
                    </Button>

                    <p
                      className={`text-center text-xs flex justify-center items-center gap-1 mt-2 ${
                        plan.popular ? "text-white/90" : "text-slate-500"
                      }`}
                    >
                      <Shield className="w-3 h-3 flex-shrink-0" />
                      <span className="whitespace-nowrap">30-day money-back guarantee</span>
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center mt-8 sm:mt-10 lg:mt-12 space-y-4 text-slate-600 text-xs sm:text-sm px-4">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6">
            <div className="flex items-center justify-center gap-1">
              <Check className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="whitespace-nowrap">Cancel anytime</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <Check className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="whitespace-nowrap">No setup fees</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <Check className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="whitespace-nowrap">Instant access</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <CreditCard className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="whitespace-nowrap">Secure payments</span>
            </div>
          </div>
          <p className="max-w-xl mx-auto leading-relaxed">
            Join over 12,000 successful bettors who trust FadeMeBets for consistent, profitable picks.
          </p>
        </div>
      </div>
    </section>
  )
}
