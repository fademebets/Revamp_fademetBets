"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, Calendar, Users } from "lucide-react"

const sportsOptions = [
  { value: "nba", label: "NBA" },
  { value: "nfl", label: "NFL" },
  { value: "mlb", label: "MLB" },
  { value: "nhl", label: "NHL" },
  { value: "soccer", label: "Soccer" },
  { value: "tennis", label: "Tennis" },
  { value: "custom", label: "Custom Sport" },
]

export function LockAdmin() {
  const [formData, setFormData] = useState({
    sport: "",
    customSport: "",
    game: "",
    pick: "",
    odds: "",
    confidence: "",
    analysis: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Lock of the Day submitted:", formData)
    setIsSubmitting(false)

    // Reset form
    setFormData({
      sport: "",
      customSport: "",
      game: "",
      pick: "",
      odds: "",
      confidence: "",
      analysis: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-red-500 to-red-900 rounded-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
            Lock of the Day
          </h1>
          <p className="text-gray-600 mt-2">Create your premium sports betting pick with detailed analysis</p>
        </div>
     <div className="flex items-center gap-4">
      <Badge variant="outline" className="flex items-center gap-2 text-sm text-gray-700">
        <Calendar className="h-4 w-4 text-emerald-600" />
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </Badge>
    </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* <Card className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700">This Month</p>
                <p className="text-2xl font-bold text-emerald-900">23-7</p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card> */}

        {/* <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Win Rate</p>
                <p className="text-2xl font-bold text-blue-900">76.7%</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card> */}
{/*
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Followers</p>
                <p className="text-2xl font-bold text-purple-900">12.4K</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card> */}
      </div>

      {/* Main Form Card */}
      <Card className="bg-white shadow-xl border-0 ring-1 p-0 ring-gray-200">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 p-5 rounded-t-xl border-b border-gray-200">
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <div className="p-1.5 bg-red-500 rounded-md">
              <Target className="h-5 w-5 text-white" />
            </div>
            Create Lock of the Day
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sport Selection */}
            <div className="space-y-2">
              <Label htmlFor="sport" className="text-sm font-semibold text-gray-700">
                Sport *
              </Label>
              <Select value={formData.sport} onValueChange={(value) => handleInputChange("sport", value)}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                  <SelectValue placeholder="Select a sport" />
                </SelectTrigger>
                <SelectContent>
                  {sportsOptions.map((sport) => (
                    <SelectItem key={sport.value} value={sport.value}>
                      {sport.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Custom Sport Input */}
            {formData.sport === "custom" && (
              <div className="space-y-2">
                <Label htmlFor="customSport" className="text-sm font-semibold text-gray-700">
                  Custom Sport *
                </Label>
                <Input
                  id="customSport"
                  value={formData.customSport}
                  onChange={(e) => handleInputChange("customSport", e.target.value)}
                  placeholder="Enter custom sport name"
                  className="h-12 w-[20rem] border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            )}

            {/* Game and Pick Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="game" className="text-sm font-semibold text-gray-700">
                  Game *
                </Label>
                <Input
                  id="game"
                  value={formData.game}
                  onChange={(e) => handleInputChange("game", e.target.value)}
                  placeholder="e.g., Boston Celtics vs Indiana Pacers"
                  className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pick" className="text-sm font-semibold text-gray-700">
                  Pick *
                </Label>
                <Input
                  id="pick"
                  value={formData.pick}
                  onChange={(e) => handleInputChange("pick", e.target.value)}
                  placeholder="e.g., Jayson Tatum Over 24.5 Points"
                  className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </div>


            {/* Odds and Confidence Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="odds" className="text-sm font-semibold text-gray-700">
                  Odds *
                </Label>
                <Input
                  id="odds"
                  value={formData.odds}
                  onChange={(e) => handleInputChange("odds", e.target.value)}
                  placeholder="e.g., -110"
                  className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confidence" className="text-sm font-semibold text-gray-700">
                  Confidence *
                </Label>
                <div className="relative">
                  <Input
                    id="confidence"
                    value={formData.confidence}
                    onChange={(e) => handleInputChange("confidence", e.target.value)}
                    placeholder="e.g., 85"
                    type="number"
                    min="0"
                    max="100"
                    className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 pr-8"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">%</span>
                </div>
              </div>
            </div>

            {/* Analysis */}
            <div className="space-y-2">
              <Label htmlFor="analysis" className="text-sm font-semibold text-gray-700">
                Analysis *
              </Label>
              <Textarea
                id="analysis"
                value={formData.analysis}
                onChange={(e) => handleInputChange("analysis", e.target.value)}
                placeholder="Provide detailed analysis for this pick..."
                rows={6}
                className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-[#1c1c1c] hover:from-red-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Lock...
              </div>
            ) : (
              "Create Lock of the Day"
            )}
          </Button>

            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
