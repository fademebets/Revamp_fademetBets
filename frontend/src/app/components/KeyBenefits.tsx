import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, TrendingUp, Zap, Users, PieChart } from "lucide-react"

export default function Benefits() {
  const benefits = [
    {
      icon: <BarChart3 className="w-12 h-12" />,
      emoji: "📊",
      title: "Data-Backed Picks",
      description:
        "Advanced analytics and statistical models power every recommendation, ensuring you get picks based on solid data, not gut feelings.",
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      emoji: "💸",
      title: "Bankroll Growth Focus",
      description:
        "Strategic betting approaches designed to maximize your long-term profitability while managing risk effectively.",
    },
    {
      icon: <Zap className="w-12 h-12" />,
      emoji: "⚡",
      title: "Instant Notifications",
      description:
        "Get real-time alerts for high-value betting opportunities so you never miss a profitable pick.",
    },
    {
      icon: <Users className="w-12 h-12" />,
      emoji: "🤝",
      title: "Sharp Bettors Community",
      description:
        "Connect with experienced bettors, share insights, and learn from a community of profitable sports investors.",
    },
    {
      icon: <PieChart className="w-12 h-12" />,
      emoji: "📈",
      title: "Real ROI Transparency",
      description:
        "Track verified performance metrics and see exactly how our picks perform with complete transparency.",
    },
  ]

  return (
    <section className="relative min-h-screen bg-white text-gray-900 py-16 lg:py-24 overflow-hidden">
      {/* Gradient Overlays */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-red-400/5 rounded-full blur-3xl"></div>

      <div className="relative container max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold break-words">
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              FadeMeBets: Your Edge in Sports Betting
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get daily +EV picks from our advanced analytics platform designed to give you a consistent edge in sports betting markets.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="group relative bg-gray-50 border border-gray-200 backdrop-blur-sm hover:bg-red-50 transition-all duration-300 hover:scale-105 hover:border-red-200"
            >
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                {/* Icon Container */}
                <div className="relative w-20 h-20 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-red-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-white to-gray-100 rounded-2xl border border-gray-200 flex items-center justify-center group-hover:border-red-300 transition-all duration-300">
                    <div className="absolute inset-0 flex items-center justify-center text-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      {benefit.emoji}
                    </div>
                    <div className="text-red-400/20 group-hover:text-red-400/30 transition-colors duration-300">
                      {benefit.icon}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                    {benefit.description}
                  </p>
                </div>

                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-400/0 via-red-500/10 to-red-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-600 text-sm font-medium">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
            Join 10,000+ profitable bettors
          </div>

          <p className="text-gray-600 max-w-xl mx-auto text-base md:text-lg">
            Ready to transform your betting strategy? Our proven system has helped thousands of bettors achieve consistent profitability through disciplined, data-driven approaches.
          </p>
        </div>
      </div>
    </section>
  )
}
