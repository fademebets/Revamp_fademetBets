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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Pagination } from "./pagination"
import {
  TrendingUp,
  Target,
  Percent,
  DollarSign,
  FileText,
  Plus,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  Search,
  Loader2,
} from "lucide-react"

// Hooks and API
import { useEvPicks, useCreateEvPick, useUpdateEvPick, useDeleteEvPick } from "@/hooks/use-ev-picks"
import { useEvPicksStore } from "@/store/ev-picks-store"
import type { EvPick, CreateEvPickData } from "@/types/ev"

// Form data interface
interface FormData {
  title: string
  description: string
  odds: string
  evValue: string
  confidence: string
  coverPercentage: string
  status: string
}

// Move EvPickForm component outside to prevent recreation on every render
interface EvPickFormProps {
  formData: FormData
  onInputChange: (field: string, value: string) => void
  onSubmit: (e: React.FormEvent) => void
  isEdit?: boolean
  isLoading?: boolean
}

const EvPickForm: React.FC<EvPickFormProps> = ({
  formData,
  onInputChange,
  onSubmit,
  isEdit = false,
  isLoading = false,
}) => {
  const isFormValid =
    formData.title &&
    formData.description &&
    formData.odds &&
    formData.evValue &&
    formData.confidence &&
    formData.coverPercentage

  return (
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
          onChange={(e) => onInputChange("title", e.target.value)}
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
          onChange={(e) => onInputChange("description", e.target.value)}
          className="min-h-32 text-base p-4 border-2 focus:border-emerald-500 transition-colors resize-none"
        />
        <p className="text-sm text-slate-500">Include comprehensive analysis to justify the expected value</p>
      </div>

      <Separator />

      {/* Status Section - Only show in edit mode */}
      {isEdit && (
        <>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-indigo-600" />
              <Label htmlFor="status" className="text-lg font-semibold text-slate-900">
                Status
              </Label>
            </div>
            <Select value={formData.status} onValueChange={(value) => onInputChange("status", value)}>
              <SelectTrigger className="text-lg p-4 border-2 focus:border-indigo-500 transition-colors">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-slate-500">Change the status of this EV pick</p>
          </div>
          <Separator />
        </>
      )}

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
            step="1"
            placeholder="-110"
            value={formData.odds}
            onChange={(e) => onInputChange("odds", e.target.value)}
            className="text-lg p-4 border-2 focus:border-amber-500 transition-colors"
          />
          <p className="text-xs text-slate-500">American odds format (e.g., -110, +150)</p>
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
            placeholder="12.5"
            value={formData.evValue}
            onChange={(e) => onInputChange("evValue", e.target.value)}
            className="text-lg p-4 border-2 focus:border-emerald-500 transition-colors"
          />
          <p className="text-xs text-slate-500">Expected value calculation</p>
        </div>

        {/* Confidence */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            <Label htmlFor="confidence" className="font-semibold text-slate-900">
              Confidence
            </Label>
          </div>
          <Input
            id="confidence"
            placeholder="85%"
            value={formData.confidence}
            onChange={(e) => onInputChange("confidence", e.target.value)}
            className="text-lg p-4 border-2 focus:border-purple-500 transition-colors"
          />
          <p className="text-xs text-slate-500">Confidence level (e.g., 85%)</p>
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
            placeholder="68"
            value={formData.coverPercentage}
            onChange={(e) => onInputChange("coverPercentage", e.target.value)}
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
              {isEdit && (
                <div className="flex items-center gap-1">
                  <span className="text-slate-500">Status:</span>
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                    {formData.status}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={!isFormValid || isLoading}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-200"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
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
}

export function EvPicksAdmin() {
  const { data: evPicks, isLoading, error } = useEvPicks()
  const createEvPickMutation = useCreateEvPick()
  const updateEvPickMutation = useUpdateEvPick()
  const deleteEvPickMutation = useDeleteEvPick()

  // Store state
  const {
    currentPage,
    searchTerm,
    statusFilter,
    setCurrentPage,
    setSearchTerm,
    setStatusFilter,
    getPaginatedPicks,
    getTotalPages,
  } = useEvPicksStore()

  // Local state
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingPick, setEditingPick] = useState<EvPick | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
const [pickToDelete, setPickToDelete] = useState<EvPick | null>(null)
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    odds: "",
    evValue: "",
    confidence: "",
    coverPercentage: "",
    status: "draft",
  })

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      odds: "",
      evValue: "",
      confidence: "",
      coverPercentage: "",
      status: "draft",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const createData: CreateEvPickData = {
      title: formData.title,
      description: formData.description,
      odds: Number.parseFloat(formData.odds),
      evValue: Number.parseFloat(formData.evValue),
      confidence: formData.confidence,
      coverPercentage: Number.parseInt(formData.coverPercentage),
    }

    try {
      await createEvPickMutation.mutateAsync(createData)
      setIsCreateDialogOpen(false)
      resetForm()
    } catch (error) {
      // Error is handled in the mutation
    }
  }

  const handleEdit = (pick: EvPick) => {
    setEditingPick(pick)
    setFormData({
      title: pick.title,
      description: pick.description,
      odds: pick.odds.toString(),
      evValue: pick.evValue.toString(),
      confidence: pick.confidence || "",
      coverPercentage: pick.coverPercentage.toString(),
      status: pick.status,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPick) return

    const updateData = {
      title: formData.title,
      description: formData.description,
      odds: Number.parseFloat(formData.odds),
      evValue: Number.parseFloat(formData.evValue),
      confidence: formData.confidence,
      coverPercentage: Number.parseInt(formData.coverPercentage),
      status: formData.status,
    }

    try {
      await updateEvPickMutation.mutateAsync({
        id: editingPick._id,
        data: updateData,
      })
      setIsEditDialogOpen(false)
      setEditingPick(null)
      resetForm()
    } catch (error) {
      // Error is handled in the mutation
    }
  }

  const handleDelete = async (pickId: string) => {
    if (window.confirm("Are you sure you want to delete this EV pick?")) {
      try {
        await deleteEvPickMutation.mutateAsync(pickId)
      } catch (error) {
        // Error is handled in the mutation
      }
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Active</Badge>
      case "won":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Won</Badge>
      case "lost":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Lost</Badge>
      case "expired":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Expired</Badge>
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Draft</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getInitials = (text: string | undefined | null) => {
    if (!text) return ""
    return text
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const paginatedPicks = getPaginatedPicks()
  const totalPages = getTotalPages()

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error loading EV picks</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    )
  }

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

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search picks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="won">Won</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
            <EvPickForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              isLoading={createEvPickMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* EV Picks Table */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="font-semibold text-gray-700 py-4">PICK DETAILS</TableHead>
                    <TableHead className="font-semibold text-gray-700">EV VALUE</TableHead>
                    <TableHead className="font-semibold text-gray-700">COVER %</TableHead>
                    <TableHead className="font-semibold text-gray-700">CONFIDENCE</TableHead>
                    <TableHead className="font-semibold text-gray-700">DATE</TableHead>
                    <TableHead className="font-semibold text-gray-700">STATUS</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                 {paginatedPicks.map((pick, index) => (
  <TableRow key={pick._id || index} className="border-b border-gray-100 hover:bg-gray-50">
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-sm font-medium text-emerald-700">
                            {getInitials(pick.title)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{pick.title}</div>
                            <div className="text-sm text-gray-500">Odds: {pick.odds}</div>
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
                        <span className="text-gray-700">{pick.confidence}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-700">{formatDate(pick.date)}</span>
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
                             onClick={() => {
                                setPickToDelete(pick)
                                setIsDeleteDialogOpen(true)
                              }}
                              className="flex items-center gap-2 text-red-600"
                              disabled={deleteEvPickMutation.isPending}
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



              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-4 border-t">
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
              )}
            </>
          )}
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
          <EvPickForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleUpdate}
            isEdit={true}
            isLoading={updateEvPickMutation.isPending}
          />
        </DialogContent>
      </Dialog>

  {/* delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold text-gray-900">{pickToDelete?.title}</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={deleteEvPickMutation.isPending}
              onClick={async () => {
                if (!pickToDelete) return
                try {
                  await deleteEvPickMutation.mutateAsync(pickToDelete._id)
                  setIsDeleteDialogOpen(false)
                  setPickToDelete(null)
                } catch (err) {
                  // handled by mutation onError
                }
              }}
            >
              {deleteEvPickMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
