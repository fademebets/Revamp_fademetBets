"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calculator, TrendingUp, DollarSign, Target, BookOpen } from "lucide-react"

export default function EVCalculator() {
  const [wager, setWager] = useState("100")
  const [odds, setOdds] = useState("110")
  const [winProb, setWinProb] = useState("60")
  const [expectedValue, setExpectedValue] = useState("0.00")
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateEV = async () => {
    setIsCalculating(true)

    // Add a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    const wagerAmount = Number.parseFloat(wager)
    const oddsValue = Number.parseFloat(odds)
    const winProbability = Number.parseFloat(winProb) / 100

    if (
      isNaN(wagerAmount) ||
      isNaN(oddsValue) ||
      isNaN(winProbability) ||
      wagerAmount <= 0 ||
      winProbability < 0 ||
      winProbability > 1
    ) {
      alert(
        "Please enter valid values:\n• Wager must be positive\n• Odds can be positive or negative\n• Win probability must be between 0-100%",
      )
      setIsCalculating(false)
      return
    }

    // Calculate PROFIT if the bet wins
    let profitIfWin = 0
    if (oddsValue > 0) {
      profitIfWin = (oddsValue / 100) * wagerAmount
    } else {
      profitIfWin = (100 / Math.abs(oddsValue)) * wagerAmount
    }

    const lossIfLose = wagerAmount
    // EV formula: (Win Probability × Profit if Win) - (Loss Probability × Wager)
    const expectedProfit = winProbability * profitIfWin - (1 - winProbability) * lossIfLose

    setExpectedValue(expectedProfit.toFixed(2))
    setIsCalculating(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      calculateEV()
    }
  }

  const evValue = Number.parseFloat(expectedValue)
  const isPositiveEV = evValue >= 0

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">📊 Expected Value Calculator</h1>
          <p className="text-gray-600">Determine if your bet has positive or negative expected value</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calculator Card */}
          <Card className="shadow-lg py-[-1px]">
            <CardHeader className="bg-gradient-to-r py-5 from-red-600 to-red-800 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                EV Calculator
              </CardTitle>
              <CardDescription className="text-green-100">Enter your betting details below</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Wager Input */}
              <div className="space-y-2">
                <Label htmlFor="wager" className="flex items-center gap-2 text-sm font-medium">
                  <DollarSign className="h-4 w-4" />
                  Wager Amount ($)
                </Label>
                <Input
                  id="wager"
                  type="number"
                  placeholder="Enter your wager amount"
                  value={wager}
                  onChange={(e) => setWager(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-lg"
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Odds Input */}
              <div className="space-y-2">
                <Label htmlFor="odds" className="flex items-center gap-2 text-sm font-medium">
                  <Target className="h-4 w-4" />
                  Betting Odds (e.g. +110 or -110)
                </Label>
                <Input
                  id="odds"
                  type="number"
                  placeholder="Enter odds (positive or negative)"
                  value={odds}
                  onChange={(e) => setOdds(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-lg"
                />
              </div>

              {/* Win Probability Input */}
              <div className="space-y-2">
                <Label htmlFor="winProb" className="flex items-center gap-2 text-sm font-medium">
                  <TrendingUp className="h-4 w-4" />
                  Win Probability (%)
                </Label>
                <Input
                  id="winProb"
                  type="number"
                  placeholder="Enter win probability percentage"
                  value={winProb}
                  onChange={(e) => setWinProb(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-lg"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>

              {/* Calculate Button */}
              <Button
                onClick={calculateEV}
                disabled={isCalculating}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-lg py-6"
              >
                {isCalculating ? "Calculating..." : "Calculate Expected Value"}
              </Button>

              {/* Result Display */}
              <div
                className={`p-6 rounded-lg border-2 text-center transition-all duration-300 ${
                  isPositiveEV ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                }`}
              >
                <div className="text-sm font-medium text-gray-600 mb-2">Expected Value</div>
                <div
                  className={`text-4xl font-bold transition-all duration-300 ${
                    isPositiveEV ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ${expectedValue}
                </div>
                <div className={`text-sm mt-2 font-medium ${isPositiveEV ? "text-green-600" : "text-red-600"}`}>
                  {isPositiveEV ? "✅ Positive EV - Good bet!" : "❌ Negative EV - Avoid this bet"}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Card */}
          <Card className="shadow-lg py-[-1px]">
            <CardHeader className="bg-gradient-to-r py-7 from-red-600 to-red-800 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                How to Use This EV Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700">
                The Expected Value (EV) calculator helps you determine whether a bet has positive or negative expected
                value over the long term.
              </p>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">📋 Inputs Required:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="font-medium">Wager:</span>
                    <span>The amount you plan to bet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium">Odds:</span>
                    <span>The sportsbook odds (use + for underdogs, - for favorites)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium">Win Probability:</span>
                    <span>Your estimated chance of winning (as a percentage)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">🧮 Formula Used:</h3>
                <div className="text-sm text-blue-800 font-mono bg-white p-2 rounded border">
                  EV = (Win Probability × Profit if Win) - (Loss Probability × Wager)
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h3 className="font-semibold text-amber-900 mb-2">💡 Example:</h3>
                <p className="text-sm text-amber-800">
                  A $100 bet on +110 odds with a 60% win probability gives you an EV of <strong>+$5.45</strong>, meaning
                  you can expect to profit $5.45 on average per bet over many similar wagers.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="font-semibold text-green-700">✅ Positive EV</div>
                  <div className="text-green-600">Good bet (profitable long-term)</div>
                </div>
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <div className="font-semibold text-red-700">❌ Negative EV</div>
                  <div className="text-red-600">Bad bet (losing long-term)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
