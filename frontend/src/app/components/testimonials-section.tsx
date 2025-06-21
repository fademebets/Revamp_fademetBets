"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  Star,
  TrendingUp,
  Users,
  Target,
  CheckCircle,
} from "lucide-react"

export default function Testimonial() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Marcus Rodriguez",
      role: "Professional Bettor",
      location: "Las Vegas, NV",
      memberSince: "Jan 2023",
      roi: "+34.2%",
      testimonial:
        "FadeMeBets completely transformed my approach to sports betting. Their data-driven picks and bankroll management strategies helped me turn a $2,000 starting bankroll into over $6,800 in just 8 months. The community support is incredible.",
      verified: true,
      avatar: "MR",
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Finance Professional",
      location: "New York, NY",
      memberSince: "Mar 2023",
      roi: "+28.7%",
      testimonial:
        "As someone with a finance background, I appreciate the statistical rigor behind every pick. The transparency in tracking ROI and the consistent +EV opportunities have made this my most profitable investment strategy.",
      verified: true,
      avatar: "SC",
    },
    {
      id: 3,
      name: "David Thompson",
      role: "Small Business Owner",
      location: "Chicago, IL",
      memberSince: "Nov 2022",
      roi: "+41.5%",
      testimonial:
        "I was skeptical at first, but the results speak for themselves. The instant notifications saved me from missing several high-value bets, and the community insights have taught me more about sports betting than years of going solo.",
      verified: true,
      avatar: "DT",
    },
    {
      id: 4,
      name: "Jennifer Walsh",
      role: "Data Analyst",
      location: "Austin, TX",
      memberSince: "Feb 2023",
      roi: "+31.9%",
      testimonial:
        "The analytical approach here is exactly what I was looking for. No gut feelings or hunches - just pure data and proven strategies. My bankroll has grown consistently every month since joining.",
      verified: true,
      avatar: "JW",
    },
    {
      id: 5,
      name: "Michael Foster",
      role: "Software Engineer",
      location: "Seattle, WA",
      memberSince: "Dec 2022",
      roi: "+37.3%",
      testimonial:
        "The combination of expert picks and educational content has been game-changing. I've learned to think like a sharp bettor, and my results have improved dramatically. Best investment I've made this year.",
      verified: true,
      avatar: "MF",
    },
  ]

  const kpis = [
    {
      label: "Average Member ROI",
      value: "+32.8%",
      description: "Over 12 months",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-red-500",
    },
    {
      label: "Weekly Wins",
      value: "78%",
      description: "Win rate this month",
      icon: <Target className="w-5 h-5" />,
      color: "text-red-500",
    },
    {
      label: "Active Members",
      value: "12,847",
      description: "Growing community",
      icon: <Users className="w-5 h-5" />,
      color: "text-red-500",
    },
    {
      label: "Total Profit Generated",
      value: "$2.4M+",
      description: "For our members",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-red-500",
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )
  }

  useEffect(() => {
  const interval = setInterval(nextTestimonial, 6000)
  return () => clearInterval(interval)
}, [nextTestimonial])

  return (
    <section className="relative bg-white text-gray-900 py-16 lg:py-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-red-500/5 rounded-full blur-3xl"></div>

      <div className="relative container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-600 text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Verified Member Results
          </div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Real Members, Real Results
            </span>
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            See how our community of sharp bettors is consistently beating the odds and growing their bankrolls.
          </p>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {kpis.map((kpi, index) => (
            <Card key={index} className="bg-gray-50 border border-gray-200">
              <CardContent className="p-5 text-center">
                <div className={`mx-auto mb-3 flex items-center justify-center w-10 h-10 rounded-lg bg-red-100 ${kpi.color}`}>
                  {kpi.icon}
                </div>
                <p className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
                <p className="text-xs font-medium text-gray-900">{kpi.label}</p>
                <p className="text-xs text-gray-500">{kpi.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-3xl mx-auto">
          <Card className="bg-gray-50 border border-gray-200">
            <CardContent className="p-6 md:p-10 relative">
              <div className="text-center space-y-5">
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-red-500 text-red-500" />
                  ))}
                </div>

               <blockquote className="text-base md:text-lg text-gray-700 leading-relaxed italic">
                &ldquo;{testimonials[currentTestimonial].testimonial}&rdquo;
              </blockquote>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 text-center sm:text-left">
                   <div className="flex justify-center sm:justify-start">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-red-600 to-red-800 text-white font-semibold text-lg">
                      {testimonials[currentTestimonial].avatar}
                    </div>
                  </div>
                  <div>
                     <h4 className="font-semibold text-gray-900 flex items-center justify-center sm:justify-start gap-2">
                        {testimonials[currentTestimonial].name}
                        {testimonials[currentTestimonial].verified && (
                          <CheckCircle className="w-4 h-4 text-red-500" />
                        )}
                      </h4>
                   <p className="text-sm text-gray-600 text-center sm:text-left">
                      {testimonials[currentTestimonial].role}
                    </p>
                    <p className="text-xs text-gray-500 text-center sm:text-left">
                      {testimonials[currentTestimonial].location} • Member since {testimonials[currentTestimonial].memberSince}
                    </p>

                  </div>
                <div className="self-center sm:self-auto px-3 py-1 bg-red-100 border border-red-200 rounded-full">
  <span className="text-red-600 text-xs font-semibold">ROI: {testimonials[currentTestimonial].roi}</span>
</div>

                </div>

                {/* Navigation */}
                <div className="flex justify-center gap-3 mt-6">
                  <Button variant="ghost" size="icon" onClick={prevTestimonial} className="w-10 h-10 bg-red-100 text-red-600">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={nextTestimonial} className="w-10 h-10 bg-red-100 text-red-600">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-1 mt-3">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentTestimonial ? "bg-red-500 w-6" : "bg-gray-300 w-2"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12 space-y-4">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-red-500" />
              All testimonials verified
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-red-500" />
              Real member results
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-red-500" />
              Transparent tracking
            </div>
          </div>
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            Join thousands of sharp bettors transforming their approach to sports betting with our proven strategies and community.
          </p>
        </div>
      </div>
    </section>
  )
}
