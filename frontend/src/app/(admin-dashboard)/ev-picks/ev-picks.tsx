"use client"

import type React from "react"

import { useState } from "react"
import { TrendingUp, Target, Percent, DollarSign, FileText, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function EvPicks() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    odds: "",
    evValue: "",
    coverPercentage: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("EV Bet Created:", formData)
    // Handle form submission here
  }

  const isFormValid =
    formData.title && formData.description && formData.odds && formData.evValue && formData.coverPercentage

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
       {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-gradient-to-r from-red-500 to-red-900 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">EV Picks Admin</h1>
          </div>
          <p className="text-slate-600 text-lg">Create and manage Expected Value betting picks</p>

        </div>


        {/* Main Form Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gray-100 py-5 rounded-t-lg">
            <div className="flex items-center gap-3">
             <div className="p-2 bg-red-500 rounded-lg">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-[#1c1c1c]">Create Expected Value Bet</CardTitle>
                <CardDescription className="text-zinc-600">
                  Add a new EV pick with detailed analysis and projections
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-slate-600" />
                  <Label htmlFor="title" className="text-lg font-semibold text-slate-900">
                    Bet Title
                  </Label>
                </div>
                <Input
                  id="title"
                  placeholder="e.g., Over 2.5 Goals - Liverpool vs Chelsea"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="text-lg p-4 border-2 focus:border-emerald-500 transition-colors"
                />
                <p className="text-sm text-slate-500">Enter a clear, descriptive title for the betting pick</p>
              </div>

              <Separator />

              {/* Description Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-slate-600" />
                  <Label htmlFor="description" className="text-lg font-semibold text-slate-900">
                    Detailed Analysis
                  </Label>
                </div>
                <Textarea
                  id="description"
                  placeholder="Provide detailed analysis including team form, head-to-head records, key player availability, weather conditions, and any other relevant factors that support this EV pick..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="min-h-32 text-base p-4 border-2 focus:border-emerald-500 transition-colors resize-none"
                />
                <p className="text-sm text-slate-500">Include comprehensive analysis to justify the expected value</p>
              </div>

              <Separator />

              {/* Betting Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Odds */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-amber-600" />
                    <Label htmlFor="odds" className="font-semibold text-slate-900">
                      Odds
                    </Label>
                  </div>
                  <Input
                    id="odds"
                    type="number"
                    step="0.01"
                    placeholder="1.85"
                    value={formData.odds}
                    onChange={(e) => handleInputChange("odds", e.target.value)}
                    className="text-lg p-4 border-2 focus:border-amber-500 transition-colors"
                  />
                  <p className="text-xs text-slate-500">Decimal odds format</p>
                </div>

                {/* EV Value */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                    <Label htmlFor="evValue" className="font-semibold text-slate-900">
                      EV Value
                    </Label>
                  </div>
                  <Input
                    id="evValue"
                    type="number"
                    step="0.01"
                    placeholder="0.12"
                    value={formData.evValue}
                    onChange={(e) => handleInputChange("evValue", e.target.value)}
                    className="text-lg p-4 border-2 focus:border-emerald-500 transition-colors"
                  />
                  <p className="text-xs text-slate-500">Expected value calculation</p>
                </div>

                {/* Cover Percentage */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Percent className="h-5 w-5 text-blue-600" />
                    <Label htmlFor="coverPercentage" className="font-semibold text-slate-900">
                      Cover %
                    </Label>
                  </div>
                  <Input
                    id="coverPercentage"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="65"
                    value={formData.coverPercentage}
                    onChange={(e) => handleInputChange("coverPercentage", e.target.value)}
                    className="text-lg p-4 border-2 focus:border-blue-500 transition-colors"
                  />
                  <p className="text-xs text-slate-500">Probability of success (%)</p>
                </div>
              </div>

              <Separator />

              {/* Preview Section */}
              {isFormValid && (
                <div className="bg-slate-50 rounded-lg p-6 border-2 border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Pick Preview
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-slate-800">{formData.title}</h4>
                      <p className="text-slate-600 text-sm mt-1">{formData.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-slate-500">Odds:</span>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          {formData.odds}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-500">EV:</span>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          +{formData.evValue}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-500">Cover:</span>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {formData.coverPercentage}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <Button
                  type="submit"
                  size="lg"
                  disabled={!isFormValid}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Create EV Bet
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
