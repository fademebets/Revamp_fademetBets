import { Check, Zap, Shield, TrendingUp, Target, Users, Clock, ArrowRight, Crown, Gem } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import SubscriptionPlan from "@/app/components/subscription-plans"

export default function ServicesComponent() {
  const services = [
    {
      icon: <Target className="h-8 w-8 text-red-600" />,
      title: "Lock of the Day",
      description: "Our highest confidence pick with detailed analysis and reasoning.",
      features: ["95%+ confidence level", "Detailed breakdown", "Risk assessment", "Betting strategy"],
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-red-600" />,
      title: "EV Picks",
      description: "Expected value plays that exploit market inefficiencies for long-term profit.",
      features: ["Mathematical edge", "Value betting", "Market analysis", "ROI optimization"],
    },
    {
      icon: <Zap className="h-8 w-8 text-red-600" />,
      title: "Live Betting Alerts",
      description: "Real-time opportunities as games unfold with instant notifications.",
      features: ["Live odds monitoring", "In-game analysis", "Quick alerts", "Mobile notifications"],
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Bankroll Management",
      description: "Professional guidance on bet sizing and risk management strategies.",
      features: ["Kelly Criterion", "Unit sizing", "Risk assessment", "Portfolio theory"],
    },
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "$49",
      period: "/month",
      description: "Perfect for casual bettors looking to improve their edge",
      features: ["3-5 daily picks", "Basic analysis", "Discord access", "Mobile app", "Email support"],
      popular: false,
      cta: "Start Winning",
    },
    {
      name: "Pro",
      price: "$99",
      period: "/month",
      description: "For serious bettors ready to maximize their profits",
      features: [
        "8-12 daily picks",
        "Detailed analysis",
        "Lock of the Day",
        "EV picks",
        "Live betting alerts",
        "Priority Discord",
        "Bankroll guidance",
        "Phone support",
      ],
      popular: true,
      cta: "Go Pro",
    },
    {
      name: "Elite",
      price: "$199",
      period: "/month",
      description: "Premium service for high-volume professional bettors",
      features: [
        "15+ daily picks",
        "Advanced analytics",
        "All pick types",
        "Custom strategies",
        "1-on-1 consultations",
        "VIP Discord channel",
        "API access",
        "Dedicated support",
      ],
      popular: false,
      cta: "Join Elite",
    },
  ]

  const howItWorks = [
    {
      step: "1",
      title: "Sign Up & Choose Plan",
      description: "Select the membership tier that fits your betting style and goals.",
    },
    {
      step: "2",
      title: "Receive Daily Picks",
      description: "Get curated picks delivered via app, email, and Discord every morning.",
    },
    {
      step: "3",
      title: "Follow Our Analysis",
      description: "Understand the reasoning behind each pick with detailed breakdowns.",
    },
    {
      step: "4",
      title: "Track Your Profits",
      description: "Monitor your ROI and bankroll growth with our tracking tools.",
    },
  ]

  const faqs = [
    {
      question: "What sports do you cover?",
      answer:
        "We provide picks for NFL, NBA, MLB, NHL, College Football, College Basketball, Soccer, and Tennis. Our coverage varies by season with focus on the most profitable markets.",
    },
    {
      question: "How do you guarantee profitability?",
      answer:
        "While we can't guarantee individual bet outcomes, our systematic approach and 85%+ historical win rate provide strong statistical confidence. We focus on long-term expected value rather than short-term results.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes, all subscriptions are month-to-month with no long-term commitments. You can cancel anytime through your account dashboard.",
    },
    {
      question: "Do you provide betting education?",
      answer:
        "We include detailed analysis with every pick, bankroll management guidance, and educational content to help you become a better bettor.",
    },
   
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100">
              Professional-grade betting analysis and picks designed to maximize your profits
            </p>
            <p className="text-lg text-red-100 max-w-3xl mx-auto leading-relaxed">
              From daily picks to advanced analytics, we provide everything you need to turn sports betting into a
              consistent income stream.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">What We Offer</h2>
              <p className="text-xl text-gray-600">
                Comprehensive betting services backed by data science and sports expertise
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">{service.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                        <p className="text-gray-600 mb-6">{service.description}</p>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center space-x-2">
                              <Check className="h-4 w-4 text-red-600 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
        <SubscriptionPlan />

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">How It Works</h2>
              <p className="text-xl text-gray-600">Simple steps to start winning consistently</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">Everything you need to know about our services</p>
            </div>

            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Gem className="h-16 w-16 mx-auto mb-8 text-red-200" />
            <h2 className="text-4xl font-bold mb-6">Ready to Start Winning?</h2>
            <p className="text-xl text-red-100 mb-8">
              Join thousands of successful bettors who trust FadeMeBets to grow their bankrolls. Your profitable betting
              journey starts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-red-600 bg-transparent"
                >
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
