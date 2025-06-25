"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Target, Calendar, Plus, MoreHorizontal, Edit, Trash2, User, Filter } from "lucide-react"

const sportsOptions = [
  { value: "nba", label: "NBA" },
  { value: "nfl", label: "NFL" },
  { value: "mlb", label: "MLB" },
  { value: "nhl", label: "NHL" },
  { value: "soccer", label: "Soccer" },
  { value: "tennis", label: "Tennis" },
  { value: "custom", label: "Custom Sport" },
]

interface Lock {
  id: string
  sport: string
  game: string
  pick: string
  odds: string
  confidence: number
  units: number
  analysis: string
  status: "Active" | "Expired" | "Pending"
  createdDate: string
  endingDate: string
}

const mockLocks: Lock[] = [
  {
    id: "1",
    sport: "NBA",
    game: "Boston Celtics vs Indiana Pacers",
    pick: "Jayson Tatum Over 24.5 Points",
    odds: "-110",
    confidence: 85,
    units: 2.5,
    analysis: "Tatum has been averaging 28.2 points in his last 5 games...",
    status: "Active",
    createdDate: "25 June 2025",
    endingDate: "30 July 2025",
  },
  {
    id: "2",
    sport: "NFL",
    game: "Kansas City Chiefs vs Buffalo Bills",
    pick: "Patrick Mahomes Over 2.5 TD Passes",
    odds: "+120",
    confidence: 78,
    units: 1.5,
    analysis: "Mahomes has thrown 3+ TDs in 4 of his last 6 games...",
    status: "Active",
    createdDate: "20 June 2025",
    endingDate: "12 August 2025",
  },
  {
    id: "3",
    sport: "MLB",
    game: "New York Yankees vs Boston Red Sox",
    pick: "Aaron Judge Over 1.5 Total Bases",
    odds: "-130",
    confidence: 72,
    units: 1.0,
    analysis: "Judge has excellent numbers against Red Sox pitching...",
    status: "Expired",
    createdDate: "15 June 2025",
    endingDate: "05 September 2025",
  },
]

export function LockAdmin() {
  const [locks, setLocks] = useState<Lock[]>(mockLocks)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingLock, setEditingLock] = useState<Lock | null>(null)
  const [formData, setFormData] = useState({
    sport: "",
    customSport: "",
    game: "",
    pick: "",
    odds: "",
    confidence: "",
    units: "",
    analysis: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const resetForm = () => {
    setFormData({
      sport: "",
      customSport: "",
      game: "",
      pick: "",
      odds: "",
      confidence: "",
      units: "",
      analysis: "",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newLock: Lock = {
      id: Date.now().toString(),
      sport: formData.sport === "custom" ? formData.customSport : formData.sport,
      game: formData.game,
      pick: formData.pick,
      odds: formData.odds,
      confidence: Number.parseInt(formData.confidence),
      units: Number.parseFloat(formData.units),
      analysis: formData.analysis,
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

    setLocks((prev) => [newLock, ...prev])
    setIsSubmitting(false)
    setIsCreateDialogOpen(false)
    resetForm()
  }

  const handleEdit = (lock: Lock) => {
    setEditingLock(lock)
    setFormData({
      sport: lock.sport.toLowerCase(),
      customSport: "",
      game: lock.game,
      pick: lock.pick,
      odds: lock.odds,
      confidence: lock.confidence.toString(),
      units: lock.units.toString(),
      analysis: lock.analysis,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingLock) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedLock: Lock = {
      ...editingLock,
      sport: formData.sport === "custom" ? formData.customSport : formData.sport,
      game: formData.game,
      pick: formData.pick,
      odds: formData.odds,
      confidence: Number.parseInt(formData.confidence),
      units: Number.parseFloat(formData.units),
      analysis: formData.analysis,
    }

    setLocks((prev) => prev.map((lock) => (lock.id === editingLock.id ? updatedLock : lock)))
    setIsSubmitting(false)
    setIsEditDialogOpen(false)
    setEditingLock(null)
    resetForm()
  }

  const handleDelete = (lockId: string) => {
    setLocks((prev) => prev.filter((lock) => lock.id !== lockId))
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "Expired":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Expired</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
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

  const LockForm = ({ onSubmit, isEdit = false }: { onSubmit: (e: React.FormEvent) => void; isEdit?: boolean }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="sport" className="text-sm font-medium">
          Sport *
        </Label>
        <Select value={formData.sport} onValueChange={(value) => handleInputChange("sport", value)}>
          <SelectTrigger>
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

      {formData.sport === "custom" && (
        <div className="space-y-2">
          <Label htmlFor="customSport" className="text-sm font-medium">
            Custom Sport *
          </Label>
          <Input
            id="customSport"
            value={formData.customSport}
            onChange={(e) => handleInputChange("customSport", e.target.value)}
            placeholder="Enter custom sport name"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="game" className="text-sm font-medium">
            Game *
          </Label>
          <Input
            id="game"
            value={formData.game}
            onChange={(e) => handleInputChange("game", e.target.value)}
            placeholder="e.g., Boston Celtics vs Indiana Pacers"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pick" className="text-sm font-medium">
            Pick *
          </Label>
          <Input
            id="pick"
            value={formData.pick}
            onChange={(e) => handleInputChange("pick", e.target.value)}
            placeholder="e.g., Jayson Tatum Over 24.5 Points"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="odds" className="text-sm font-medium">
            Odds *
          </Label>
          <Input
            id="odds"
            value={formData.odds}
            onChange={(e) => handleInputChange("odds", e.target.value)}
            placeholder="e.g., -110"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confidence" className="text-sm font-medium">
            Confidence *
          </Label>
          <div className="relative">
            <Input
              id="confidence"
              value={formData.confidence}
              onChange={(e) => handleInputChange("confidence", e.target.value)}
              placeholder="85"
              type="number"
              min="0"
              max="100"
              className="pr-8"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">%</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="units" className="text-sm font-medium">
            Units *
          </Label>
          <Input
            id="units"
            type="number"
            min="0"
            step="0.1"
            value={formData.units}
            onChange={(e) => handleInputChange("units", e.target.value)}
            placeholder="1.5"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="analysis" className="text-sm font-medium">
          Analysis *
        </Label>
        <Textarea
          id="analysis"
          value={formData.analysis}
          onChange={(e) => handleInputChange("analysis", e.target.value)}
          placeholder="Provide detailed analysis for this pick..."
          rows={4}
          className="resize-none"
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-[#1c1c1c] hover:bg-[#2c2c2c] text-white">
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            {isEdit ? "Updating..." : "Creating..."}
          </div>
        ) : isEdit ? (
          "Update Lock"
        ) : (
          "Create Lock"
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
            <div className="p-2 bg-gradient-to-r from-red-500 to-red-900 rounded-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
            Lock Management
          </h1>
          <p className="text-gray-600 mt-2">Manage your premium sports betting picks and analysis</p>
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
          <span className="text-sm text-gray-600">Locks</span>
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
              <Button className="bg-[#1c1c1c] hover:bg-[#2c2c2c] text-white flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Lock
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Create New Lock
                </DialogTitle>
                <DialogDescription>Add a new Lock of the Day with detailed analysis and projections</DialogDescription>
              </DialogHeader>
              <LockForm onSubmit={handleSubmit} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Locks Table */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="font-semibold text-gray-700 py-4">LOCK DETAILS</TableHead>
                <TableHead className="font-semibold text-gray-700">SPORT</TableHead>
                <TableHead className="font-semibold text-gray-700">CONFIDENCE</TableHead>
                <TableHead className="font-semibold text-gray-700">ENDING DATE</TableHead>
                <TableHead className="font-semibold text-gray-700">STATUS</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locks.map((lock) => (
                <TableRow key={lock.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                        {getInitials(lock.pick)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{lock.game}</div>
                        <div className="text-sm text-gray-500">{lock.pick}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-900">{lock.sport}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-900">{lock.confidence}%</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-700">{lock.endingDate}</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(lock.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(lock)} className="flex items-center gap-2">
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(lock.id)}
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Lock
            </DialogTitle>
            <DialogDescription>Update the lock details and analysis</DialogDescription>
          </DialogHeader>
          <LockForm onSubmit={handleUpdate} isEdit={true} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
