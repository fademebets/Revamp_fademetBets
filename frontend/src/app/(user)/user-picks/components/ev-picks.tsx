import { TrendingUp, Target, DollarSign, BarChart3, Calendar, Zap, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function EVPicks() {
  // Sample data for 3 EV picks
  const evPicks = [
    {
      sport: "NBA",
      customSport: "",
      game: "Los Angeles Lakers vs Boston Celtics",
      pick: "Lakers +7.5",
      odds: "+105",
      confidence: "High",
      units: "2.5",
      analysis:
        "The Lakers have been undervalued by the market recently, covering 8 of their last 10 games as underdogs. Boston is on a back-to-back and historically struggles in these spots, going 3-7 ATS in their last 10 B2B games. The line movement suggests sharp money on LA.",
    },
    {
      sport: "NFL",
      customSport: "",
      game: "Green Bay Packers vs Detroit Lions",
      pick: "Over 48.5 Total Points",
      odds: "-108",
      confidence: "Medium",
      units: "2",
      analysis:
        "Both teams rank in the top 10 for offensive efficiency, and weather conditions are favorable for passing. Detroit's defense has allowed 28+ points in 6 of their last 8 home games. Green Bay's offense has been explosive, averaging 31 points over their last 5 games.",
    },
    {
      sport: "NHL",
      customSport: "",
      game: "Tampa Bay Lightning vs Florida Panthers",
      pick: "Lightning ML",
      odds: "+125",
      confidence: "High",
      units: "3",
      analysis:
        "Tampa Bay has dominated this rivalry historically and comes in with their top line healthy. Florida is dealing with goaltending issues and has lost 4 straight home games. The Lightning's power play has been lethal, converting at 28% over their last 10 games.",
    },
  ]

  const getConfidenceColor = (confidence: string) => {
    switch (confidence.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-red-50 text-red-700 border-red-150"
      case "low":
        return "bg-red-25 text-red-600 border-red-100"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getOddsColor = (odds: string) => {
    return odds.startsWith("+") ? "text-red-600" : "text-red-700"
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="h-8 w-8 text-red-600" />
            <h1 className="text-4xl font-bold text-red-900">EV Picks</h1>
          </div>
          <p className="text-red-700 text-lg">Expected Value plays with positive long-term profit potential</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full">
            <Star className="h-4 w-4 text-red-600" />
            <span className="text-red-800 font-medium">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Picks Grid */}
        <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-6">
          {evPicks.map((pick, index) => (
            <Card key={index} className="shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r py-5 from-red-600 to-red-700 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      {pick.sport || pick.customSport}
                    </CardTitle>
                    <CardDescription className="text-red-100 mt-1">Pick #{index + 1}</CardDescription>
                  </div>
                  <Badge className={`${getConfidenceColor(pick.confidence)} text-xs font-semibold`}>
                    {pick.confidence}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {/* Game Information */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-red-800 mb-2 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Matchup
                  </h3>
                  <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                    <p className="text-lg font-bold text-red-900 text-center leading-tight">{pick.game}</p>
                  </div>
                </div>

                {/* Pick Details */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <TrendingUp className="h-4 w-4 text-red-600 mx-auto mb-1" />
                    <h4 className="text-xs font-semibold text-red-700 mb-1">Pick</h4>
                    <p className="text-sm font-bold text-red-800 leading-tight">{pick.pick}</p>
                  </div>

                  <div className="text-center p-3 bg-white rounded-lg border border-red-200">
                    <DollarSign className="h-4 w-4 text-red-600 mx-auto mb-1" />
                    <h4 className="text-xs font-semibold text-red-700 mb-1">Odds</h4>
                    <p className={`text-sm font-bold ${getOddsColor(pick.odds)}`}>{pick.odds}</p>
                  </div>

                  <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <BarChart3 className="h-4 w-4 text-red-600 mx-auto mb-1" />
                    <h4 className="text-xs font-semibold text-red-700 mb-1">Units</h4>
                    <p className="text-sm font-bold text-red-800">{pick.units}U</p>
                  </div>
                </div>

                <Separator className="my-4 bg-red-200" />

                {/* Analysis Section */}
                <div>
                  <h3 className="text-sm font-semibold text-red-800 mb-3 flex items-center gap-1">
                    <BarChart3 className="h-4 w-4" />
                    Analysis
                  </h3>
                  <div className="bg-gradient-to-r from-red-50 to-white rounded-lg p-4 border-l-4 border-red-500">
                    <p className="text-red-900 text-sm leading-relaxed">{pick.analysis}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6 border border-red-100">
          <h2 className="text-2xl font-bold text-red-900 mb-6 text-center flex items-center justify-center gap-2">
            <Star className="h-6 w-6 text-red-600" />
            Today's EV Summary
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <h3 className="text-sm font-semibold text-red-700 mb-1">Total Picks</h3>
              <p className="text-2xl font-bold text-red-800">{evPicks.length}</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <h3 className="text-sm font-semibold text-red-700 mb-1">Total Units</h3>
              <p className="text-2xl font-bold text-red-800">
                {evPicks.reduce((sum, pick) => sum + Number.parseFloat(pick.units), 0).toFixed(1)}U
              </p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <h3 className="text-sm font-semibold text-red-700 mb-1">High Confidence</h3>
              <p className="text-2xl font-bold text-red-800">
                {evPicks.filter((pick) => pick.confidence === "High").length}
              </p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <h3 className="text-sm font-semibold text-red-700 mb-1">Sports Covered</h3>
              <p className="text-2xl font-bold text-red-800">
                {new Set(evPicks.map((pick) => pick.sport || pick.customSport)).size}
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-red-100 rounded-lg border border-red-200">
          <p className="text-sm text-red-800 text-center">
            <strong>EV Disclaimer:</strong> Expected Value picks are based on mathematical analysis and market
            inefficiencies. Past performance does not guarantee future results. Please bet responsibly.
          </p>
        </div>
      </div>
    </div>
  )
}
