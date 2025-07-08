import { CheckCircle, TrendingUp, Users, Target, BarChart3, Trophy, Star, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function AboutComponent() {
  const stats = [
    { number: "85%", label: "Win Rate", description: "Average success rate across all picks" },
    { number: "10K+", label: "Active Members", description: "Sharp bettors in our community" },
    { number: "500+", label: "Daily Analysis", description: "Games analyzed every day" },
    { number: "2M+", label: "Profit Generated", description: "Total member profits this year" }
  ]

  const values = [
    {
      icon: <Target className="h-8 w-8 text-red-600" />,
      title: "Precision",
      description: "Every pick is backed by rigorous data analysis and advanced statistical modeling."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-red-600" />,
      title: "Consistency",
      description: "We focus on sustainable, long-term profitability rather than flashy short-term gains."
    },
    {
      icon: <Users className="h-8 w-8 text-red-600" />,
      title: "Community",
      description: "Building a network of successful bettors who share insights and celebrate wins together."
    }
  ]

  const team = [
    {
      name: "Alex Rodriguez",
      role: "Lead Analyst",
      experience: "Former Wall Street quant with 8+ years in sports analytics",
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      name: "Sarah Chen",
      role: "Data Scientist",
      experience: "PhD in Statistics, specializing in predictive modeling",
      image: "/placeholder.svg?height=200&width=200"
    },
    {
      name: "Mike Thompson",
      role: "Sports Expert",
      experience: "15+ years covering professional sports, former ESPN analyst",
      image: "/placeholder.svg?height=200&width=200"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About FadeMeBets
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100">
              Where data meets opportunity. Where analysis becomes profit.
            </p>
            <p className="text-lg text-red-100 max-w-3xl mx-auto leading-relaxed">
              We're not just another betting service. We're your strategic advantage in the world of sports betting,
              combining cutting-edge analytics with deep sports expertise to deliver consistent, profitable results.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600">
                To democratize professional-grade sports betting analysis and make consistent profitability
                accessible to every serious bettor.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why We Exist</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>End the guesswork:</strong> Replace hunches with hard data and proven methodologies.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Level the playing field:</strong> Give individual bettors access to institutional-quality analysis.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">
                      <strong>Build lasting success:</strong> Focus on sustainable, long-term profitability over quick wins.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-red-50 p-8 rounded-2xl">
                <BarChart3 className="h-16 w-16 text-red-600 mb-6" />
                <h4 className="text-xl font-bold text-gray-900 mb-4">Our Approach</h4>
                <p className="text-gray-700">
                  We analyze over 500 games daily, processing thousands of data points including
                  team performance metrics, player statistics, weather conditions, historical trends,
                  and market inefficiencies to identify the most profitable betting opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Core Values</h2>
              <p className="text-xl text-gray-600">
                The principles that guide every pick, every analysis, and every interaction.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-center mb-6">
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

     
      {/* Community Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Trophy className="h-16 w-16 mx-auto mb-8 text-red-200" />
            <h2 className="text-4xl font-bold mb-6">Join the Winning Community</h2>
            <p className="text-xl text-red-100 mb-8">
              Over 10,000 sharp bettors trust FadeMeBets to grow their bankrolls consistently.
              Join a community where success is shared, strategies are discussed, and profits are celebrated.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <Star className="h-8 w-8 mx-auto mb-4 text-red-200" />
                <h3 className="text-lg font-semibold mb-2">Exclusive Discord</h3>
                <p className="text-red-100 text-sm">Real-time discussions and pick alerts</p>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-4 text-red-200" />
                <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
                <p className="text-red-100 text-sm">Direct access to our analysis team</p>
              </div>
              <div className="text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-4 text-red-200" />
                <h3 className="text-lg font-semibold mb-2">Profit Tracking</h3>
                <p className="text-red-100 text-sm">Monitor your ROI and bankroll growth</p>
              </div>
            </div>
            <Link href="/services">
              <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
                Explore Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
