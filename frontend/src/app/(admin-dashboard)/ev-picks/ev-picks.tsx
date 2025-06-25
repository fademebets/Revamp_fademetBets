"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  TrendingUp,
  Target,
  Percent,
  DollarSign,
  FileText,
  Plus,
  Calendar,
  User,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react"

interface EvPick {
  id: string
  title: string
  description: string
  odds: number
  evValue: number
  coverPercentage: number
  units: number
  status: "Active" | "Expired" | "Won" | "Lost"
  createdDate: string
  endingDate: string
  sport?: string
}

const mockEvPicks: EvPick[] = [
  {
    id: "1",
    title: "Over 2.5 Goals - Liverpool vs Chelsea",
    description: "Both teams have strong attacking records with Liverpool averaging 2.8 goals per game at home...",
    odds: 1.85,
    evValue: 0.12,
    coverPercentage: 65,
    units: 2.0,
    status: "Active",
    createdDate: "25 June 2025",
    endingDate: "30 July 2025",
    sport: "Soccer",
  },
  {
    id: "2",
    title: "Patrick Mahomes Over 275.5 Passing Yards",
    description: "Mahomes has exceeded 275 passing yards in 8 of his last 10 games...",
    odds: 1.92,
    evValue: 0.08,
    coverPercentage: 72,
    units: 1.5,
    status: "Won",
    createdDate: "20 June 2025",
    endingDate: "12 August 2025",
    sport: "NFL",
  },
  {
    id: "3",
    title: "Lakers -4.5 vs Warriors",
    description: "Lakers have covered the spread in 6 of their last 8 home games...",
    odds: 1.91,
    evValue: 0.05,
    coverPercentage: 58,
    units: 1.0,
    status: "Lost",
    createdDate: "15 June 2025",
    endingDate: "05 September 2025",
    sport: "NBA",
  },
]

export function EvPicksAdmin() {
  const [evPicks, setEvPicks] = useState<EvPick[]>(mockEvPicks)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingPick, setEditingPick] = useState<EvPick | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    odds: "",
    evValue: "",
    coverPercentage: "",
    units: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      odds: "",
      evValue: "",
      coverPercentage: "",
      units: "",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newPick: EvPick = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      odds: Number.parseFloat(formData.odds),
      evValue: Number.parseFloat(formData.evValue),
      coverPercentage: Number.parseInt(formData.coverPercentage),
      units: Number.parseFloat(formData.units),
      status: "Active",
      createdDate: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      endingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    }

    setEvPicks((prev) => [newPick, ...prev])
    setIsSubmitting(false)
    setIsCreateDialogOpen(false)
    resetForm()
  }

  const handleEdit = (pick: EvPick) => {
    setEditingPick(pick)
    setFormData({
      title: pick.title,
      description: pick.description,
      odds: pick.odds.toString(),
      evValue: pick.evValue.toString(),
      coverPercentage: pick.coverPercentage.toString(),
      units: pick.units.toString(),
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPick) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedPick: EvPick = {
      ...editingPick,
      title: formData.title,
      description: formData.description,
      odds: Number.parseFloat(formData.odds),
      evValue: Number.parseFloat(formData.evValue),
      coverPercentage: Number.parseInt(formData.coverPercentage),
      units: Number.parseFloat(formData.units),
    }

    setEvPicks((prev) => prev.map((pick) => (pick.id === editingPick.id ? updatedPick : pick)))
    setIsSubmitting(false)
    setIsEditDialogOpen(false)
    setEditingPick(null)
    resetForm()
  }

  const handleDelete = (pickId: string) => {
    setEvPicks((prev) => prev.filter((pick) => pick.id !== pickId))
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Active</Badge>
      case "Won":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Won</Badge>
      case "Lost":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Lost</Badge>
      case "Expired":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Expired</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getInitials = (text: string) => {
    return text
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const isFormValid =
    formData.title &&
    formData.description &&
    formData.odds &&
    formData.evValue &&
    formData.coverPercentage &&
    formData.units

  const EvPickForm = ({ onSubmit, isEdit = false }: { onSubmit: (e: React.FormEvent) => void; isEdit?: boolean }) => (
    <form onSubmit={onSubmit} className="space-y-6">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Units */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-purple-600" />
            <Label htmlFor="units" className="font-semibold text-slate-900">
              Units
            </Label>
          </div>
          <Input
            id="units"
            type="number"
            min="0"
            step="0.1"
            placeholder="1.5"
            value={formData.units}
            onChange={(e) => handleInputChange("units", e.target.value)}
            className="text-lg p-4 border-2 focus:border-purple-500 transition-colors"
          />
          <p className="text-xs text-slate-500">Stake size in units (1-5% of bankroll)</p>
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
              <p className="text-slate-600 text-sm mt-1">{formData.description.slice(0, 100)}...</p>
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

      <Button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-200"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            {isEdit ? "Updating..." : "Creating..."}
          </div>
        ) : (
          <>
            <Plus className="mr-2 h-5 w-5" />
            {isEdit ? "Update EV Pick" : "Create EV Pick"}
          </>
        )}
      </Button>
    </form>
  )

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            EV Picks Management
          </h1>
          <p className="text-gray-600 mt-2">Create and manage Expected Value betting picks with detailed analysis</p>
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

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">EV Picks</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Calendar
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:bg-black text-white flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create EV Pick
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Create New EV Pick
                </DialogTitle>
                <DialogDescription>
                  Add a new Expected Value pick with detailed analysis and projections
                </DialogDescription>
              </DialogHeader>
              <EvPickForm onSubmit={handleSubmit} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* EV Picks Table */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="font-semibold text-gray-700 py-4">PICK DETAILS</TableHead>
                <TableHead className="font-semibold text-gray-700">EV VALUE</TableHead>
                <TableHead className="font-semibold text-gray-700">COVER %</TableHead>
                <TableHead className="font-semibold text-gray-700">ENDING DATE</TableHead>
                <TableHead className="font-semibold text-gray-700">STATUS</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {evPicks.map((pick) => (
                <TableRow key={pick.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-sm font-medium text-emerald-700">
                        {getInitials(pick.title)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{pick.title}</div>
                        <div className="text-sm text-gray-500">
                          Odds: {pick.odds} • Units: {pick.units}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">+{pick.evValue}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-900">{pick.coverPercentage}%</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-700">{pick.endingDate}</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(pick.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(pick)} className="flex items-center gap-2">
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(pick.id)}
                          className="flex items-center gap-2 text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit EV Pick
            </DialogTitle>
            <DialogDescription>Update the EV pick details and analysis</DialogDescription>
          </DialogHeader>
          <EvPickForm onSubmit={handleUpdate} isEdit={true} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
