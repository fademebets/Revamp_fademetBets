"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Calculator, RotateCcw } from 'lucide-react'

interface ParlayLeg {
  id: number
  odds: string
}

export default function ParlayCalculator() {
  const [betAmount, setBetAmount] = useState("10")
  const [legs, setLegs] = useState<ParlayLeg[]>([
    { id: 1, odds: "" },
    { id: 2, odds: "" }
  ])
  const [results, setResults] = useState({
    parlayOdds: "–",
    expectedPayout: "$0.00",
    expectedWinnings: "$0.00"
  })

  const addLeg = () => {
    const newId = Math.max(...legs.map(leg => leg.id), 0) + 1
    setLegs([...legs, { id: newId, odds: "" }])
  }

  const removeLeg = (id: number) => {
    if (legs.length > 1) {
      setLegs(legs.filter(leg => leg.id !== id))
    }
  }

  const updateLegOdds = (id: number, odds: string) => {
    setLegs(legs.map(leg =>
      leg.id === id ? { ...leg, odds } : leg
    ))
  }

  const convertToDecimal = (odds: number): number => {
    return odds > 0 ? (odds / 100) + 1 : (100 / Math.abs(odds)) + 1
  }

  const calculateParlay = () => {
    let totalDecimalOdds = 1
    let validLegs = 0

    legs.forEach(leg => {
      const odds = parseFloat(leg.odds)
      if (!isNaN(odds)) {
        totalDecimalOdds *= convertToDecimal(odds)
        validLegs++
      }
    })

    if (validLegs === 0) {
      alert('Please enter at least one valid odds leg.')
      return
    }

    const wager = parseFloat(betAmount)
    if (!isNaN(wager) && wager > 0) {
      const expectedPayout = (totalDecimalOdds * wager).toFixed(2)
      const winnings = (parseFloat(expectedPayout) - wager).toFixed(2)

      setResults({
        parlayOdds: totalDecimalOdds.toFixed(4),
        expectedPayout: `$${expectedPayout}`,
        expectedWinnings: `$${winnings}`
      })
    } else {
      setResults({
        parlayOdds: totalDecimalOdds.toFixed(4),
        expectedPayout: '$0.00',
        expectedWinnings: '$0.00'
      })
    }
  }

  const resetParlay = () => {
    setLegs([
      { id: 1, odds: "" },
      { id: 2, odds: "" }
    ])
    setBetAmount("10")
    setResults({
      parlayOdds: "–",
      expectedPayout: "$0.00",
      expectedWinnings: "$0.00"
    })
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Parlay Calculator</h1>
          <p className="text-gray-600">Calculate your parlay odds and potential winnings</p>
        </div>

        <Card className="shadow-lg py-[-1px]">
          <CardHeader className="bg-gradient-to-r py-10 from-red-600 to-red-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Parlay Calculator
            </CardTitle>
            <CardDescription className="text-grey-100">
              Enter your bet amount and odds for each leg
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Results Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="text-sm text-green-600 font-medium">Expected Winnings</div>
                <div className="text-2xl font-bold text-green-700">{results.expectedWinnings}</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-600 font-medium">Expected Payout</div>
                <div className="text-2xl font-bold text-blue-700">{results.expectedPayout}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="text-sm text-purple-600 font-medium">Parlay Odds</div>
                <div className="text-2xl font-bold text-purple-700">{results.parlayOdds}</div>
              </div>
            </div>

            {/* Bet Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="betAmount" className="text-sm font-medium">
                Bet Amount ($)
              </Label>
              <Input
                id="betAmount"
                type="number"
                placeholder="e.g. 10"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="text-lg"
              />
            </div>

            {/* Parlay Legs */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Parlay Legs</Label>
                <Badge variant="secondary">{legs.length} legs</Badge>
              </div>

              <div className="space-y-3">
                {legs.map((leg, index) => (
                  <div key={leg.id} className="flex items-center gap-3">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder={`Leg ${index + 1} (e.g. -110, +150)`}
                        value={leg.odds}
                        onChange={(e) => updateLegOdds(leg.id, e.target.value)}
                        className="text-lg"
                      />
                    </div>
                    {legs.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeLeg(leg.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button onClick={addLeg} variant="outline" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Parlay Leg
              </Button>
              <Button onClick={resetParlay} variant="outline" className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                Reset Parlay
              </Button>
              <Button onClick={calculateParlay} className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-600">
                <Calculator className="h-4 w-4" />
                Generate Odds
              </Button>
            </div>

            {/* Info */}
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> Only American Odds are supported (e.g. -110, +150)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
