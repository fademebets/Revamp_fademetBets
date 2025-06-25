"use client"

import { TrendingUp, Target, DollarSign, BarChart3, Calendar, Trophy } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function LockOfTheDay() {
  const lockData = {
    sport: "NFL",
    customSport: "",
    game: "Kansas City Chiefs vs Buffalo Bills",
    pick: "Kansas City Chiefs -3.5",
    odds: "-110",
    confidence: "High",
    units: "3",
    analysis:
      "The Chiefs have been dominant at home this season with a 7-1 record. Their offense has been clicking on all cylinders, averaging 28.5 points per game over their last 6 games. Buffalo is dealing with key injuries on their offensive line, which could be problematic against Kansas City's pass rush. The Chiefs also have the better coaching staff and more playoff experience. This line feels too low for a team of Kansas City's caliber at home.",
  }

  const getConfidenceColor = (confidence: string) => {
    switch (confidence.toLowerCase()) {
      case "high":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="h-8 w-8 text-red-600" />
            <h1 className="text-4xl font-bold text-slate-900">Lock of the Day</h1>
          </div>
          <p className="text-slate-600 text-lg">Today's premium betting pick with expert analysis</p>
        </div>

        {/* Main Card */}
        <Card className="shadow-2xl border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-red-600 py-5 to-red-800 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Target className="h-6 w-6" />
                  {lockData.sport || lockData.customSport} Pick
                </CardTitle>
                <CardDescription className="text-red-100 text-lg mt-1">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </div>
              <div className="text-right">
                <Badge className={`${getConfidenceColor(lockData.confidence)} bg-red-400 border-red-400 text-sm text-white font-semibold`}>
                  {lockData.confidence} Confidence
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            {/* Game Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-red-600" />
                Matchup
              </h3>
              <div className="bg-red-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-slate-900 text-center">{lockData.game}</p>
              </div>
            </div>

            {/* Pick Details */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-slate-700 mb-1">The Pick</h4>
                <p className="text-lg font-bold text-red-700">{lockData.pick}</p>
              </div>

              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-6 w-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-slate-700 mb-1">Odds</h4>
                <p className="text-lg font-bold text-red-700">{lockData.odds}</p>
              </div>

              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center justify-center mb-2">
                  <BarChart3 className="h-6 w-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-slate-700 mb-1">Units</h4>
                <p className="text-lg font-bold text-red-700">{lockData.units} Units</p>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Analysis Section */}
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-red-600" />
                Expert Analysis
              </h3>
              <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-600">
                <p className="text-slate-700 leading-relaxed text-lg">{lockData.analysis}</p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-red-100 rounded-lg border border-red-200">
              <p className="text-sm text-red-800 text-center">
                <strong>Disclaimer:</strong> Gambling involves risk. Please bet responsibly and within your means. This
                is for entertainment purposes only.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
