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
    <section className="relative bg-white text-slate-900 py-12 sm:py-16 lg:py-24">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-10 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-600 text-sm font-medium">
            <Zap className="w-4 h-4" />
            Choose Your Edge
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
            Join thousands of profitable bettors with our proven strategies. Choose your plan and start winning.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-700 text-sm">
                <div className="text-red-500">{feature.icon}</div>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative group transition-all duration-300 hover:scale-[1.02] ${
                plan.popular
                  ? "bg-red-600 text-white border-red-500 shadow-xl"
                  : "bg-white text-slate-900 border-slate-200 shadow-md"
              }`}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-red-600 px-3 py-1 rounded-full text-xs font-bold">
                  {plan.badge}
                </div>
              )}

              <CardHeader className="text-center space-y-4">
                <div
                  className={`mx-auto w-12 h-12 flex items-center justify-center rounded-xl ${
                    plan.popular ? "bg-white/10" : "bg-red-100 text-red-600"
                  }`}
                >
                  {plan.icon}
                </div>

                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-sm">{plan.description}</p>

                <div>
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-sm">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className={`w-4 h-4 ${plan.popular ? "text-white" : "text-red-600"}`} />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full text-base font-semibold ${
                    plan.popular
                      ? "bg-white text-red-600 hover:bg-red-50"
                      : "bg-white text-red-600 border border-red-200 hover:bg-red-50"
                  }`}
                >
                  {plan.cta}
                </Button>

              <p
                className={`text-center text-xs flex justify-center items-center gap-1 mt-2 ${
                  plan.popular ? "text-white" : "text-slate-500"
                }`}
              >
                <Shield className="w-3 h-3" />
                30-day money-back guarantee
              </p>

              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10 space-y-4 text-slate-600 text-sm">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-red-500" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-red-500" />
              No setup fees
            </div>
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-red-500" />
              Instant access
            </div>
            <div className="flex items-center gap-1">
              <Headphones className="w-4 h-4 text-red-500" />
              24/7 support
            </div>
          </div>

          <p className="max-w-xl mx-auto">
            Join over 12,000 successful bettors who trust FadeMeBets for consistent, profitable picks.
          </p>
        </div>
      </div>
    </section>
  )
}
