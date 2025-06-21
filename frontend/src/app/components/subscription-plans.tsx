"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Check, Star, Zap, Crown, TrendingUp, Bell, Users, BarChart3, Shield, Headphones } from "lucide-react"

export default function SubscriptionPlan() {
  const [, setHoveredPlan] = useState<number | null>(null)

  const plans = [
    {
      id: 1,
      name: "Starter",
      price: "$2.99",
      period: "/month",
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
          {/* Mobile: Single column, Tablet: 2 columns, Desktop: 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-none">
            {plans.map((plan) => (
              <div key={plan.id} className="w-full min-w-0">
                <Card
                  className={`relative group transition-all duration-300 hover:scale-[1.02] w-full h-full ${
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
              <Headphones className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="whitespace-nowrap">24/7 support</span>
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
