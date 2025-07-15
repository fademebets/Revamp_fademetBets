"use client"

import type React from "react"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useCreateLock, useUpdateLock, useDeleteLock } from "@/hooks/useLocks"
import type { Lock, CreateLockRequest, UpdateLockRequest, LockFormData } from "@/types/lock"
import { toast } from "sonner"

// Sports options
const sportsOptions = [
  { value: "NFL", label: "NFL" },
  { value: "NBA", label: "NBA" },
  { value: "MLB", label: "MLB" },
  { value: "NHL", label: "NHL" },
  { value: "MMA", label: "MMA" },
  { value: "Esports", label: "Esports" },
  { value: "custom", label: "Custom" },
]

// Status options matching backend enum
const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "expired", label: "Expired" },
]

// Confidence options matching your API structure
const confidenceOptions = [
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" },
]

// Utility function to safely display values
const safeDisplayValue = (value: any): string => {
  if (value === null || value === undefined) {
    return ""
  }
  return String(value)
}

// Lock form component
const LockForm = ({
  formData,
  onInputChange,
  onSubmit,
  isEdit = false,
  isSubmitting,
}: {
  formData: LockFormData
  onInputChange: (field: keyof LockFormData, value: string) => void
  onSubmit: (e: React.FormEvent) => void
  isEdit?: boolean
  isSubmitting: boolean
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="sport" className="text-sm font-medium">
          Sport *
        </Label>
        <Select value={formData.sport} onValueChange={(value) => onInputChange("sport", value)}>
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
            onChange={(e) => onInputChange("customSport", e.target.value)}
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
            onChange={(e) => onInputChange("game", e.target.value)}
            placeholder="e.g., Lakers vs Heat"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pick" className="text-sm font-medium">
            Pick *
          </Label>
          <Input
            id="pick"
            value={formData.pick}
            onChange={(e) => onInputChange("pick", e.target.value)}
            placeholder="e.g., Lakers -3.5"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="odds" className="text-sm font-medium">
            Odds *
          </Label>
          <Input
            id="odds"
            value={formData.odds}
            onChange={(e) => onInputChange("odds", e.target.value)}
            placeholder="e.g., +120"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confidence" className="text-sm font-medium">
            Confidence *
          </Label>
          <Select value={formData.confidence} onValueChange={(value) => onInputChange("confidence", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select confidence" />
            </SelectTrigger>
            <SelectContent>
              {confidenceOptions.map((confidence) => (
                <SelectItem key={confidence.value} value={confidence.value}>
                  {confidence.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="unit" className="text-sm font-medium">
            Unit *
          </Label>
          <Input
            id="unit"
            value={formData.unit}
            onChange={(e) => onInputChange("unit", e.target.value)}
            placeholder="e.g., 2u"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm font-medium">
            Status *
          </Label>
          <Select value={formData.status} onValueChange={(value) => onInputChange("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="analysis" className="text-sm font-medium">
          Analysis *
        </Label>
        <Textarea
          id="analysis"
          value={formData.analysis}
          onChange={(e) => onInputChange("analysis", e.target.value)}
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
}

interface LockAdminProps {
  locks: Lock[]
  currentPage: number
  totalPages: number
  totalLocks: number
  onPageChange: (page: number) => void
  isLoading: boolean
}

export function LockAdmin({ locks, currentPage, totalPages, totalLocks, onPageChange, isLoading }: LockAdminProps) {
  // Hooks
  const createLockMutation = useCreateLock()
  const updateLockMutation = useUpdateLock()
  const deleteLockMutation = useDeleteLock()

  // State
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [lockToDelete, setLockToDelete] = useState<Lock | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingLock, setEditingLock] = useState<Lock | null>(null)
  const [formData, setFormData] = useState<LockFormData>({
    sport: "",
    customSport: "",
    game: "",
    pick: "",
    odds: "",
    confidence: "",
    unit: "",
    analysis: "",
    status: "draft",
  })

  // Form handlers
  const handleInputChange = (field: keyof LockFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({
      sport: "",
      customSport: "",
      game: "",
      pick: "",
      odds: "",
      confidence: "",
      unit: "",
      analysis: "",
      status: "draft",
    })
  }

  const validateForm = (data: LockFormData): boolean => {
    const sport = data.sport === "custom" ? data.customSport : data.sport

    return !!(
      sport &&
      data.game &&
      data.pick &&
      data.odds &&
      data.confidence &&
      data.unit &&
      data.analysis &&
      data.status
    )
  }

  // CRUD operations
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm(formData)) {
      toast.error("Please fill in all required fields")
      return
    }

    // Create request data matching your API structure
    const lockData: CreateLockRequest = {
      sport: formData.sport === "custom" ? formData.customSport : formData.sport,
      game: formData.game,
      pick: formData.pick,
      odds: formData.odds,
      confidence: formData.confidence,
      unit: formData.unit, // This will be sent as "unit" to match your API
      analysis: formData.analysis,
      status: formData.status as "draft" | "active" | "expired",
    }

    console.log("Creating lock with data:", lockData)

    try {
      await createLockMutation.mutateAsync(lockData)
      setIsCreateDialogOpen(false)
      resetForm()
      toast.success("Lock created successfully!")
    } catch (error) {
      console.error("Error creating lock:", error)
      toast.error("Failed to create lock. Please try again.")
    }
  }

  const handleEdit = (lock: Lock) => {
    setEditingLock(lock)

    // Find matching sport option or use custom
    const sportOption = sportsOptions.find((option) => option.value === lock.sport)

    setFormData({
      sport: sportOption ? sportOption.value : "custom",
      customSport: sportOption ? "" : lock.sport,
      game: lock.game || "",
      pick: lock.pick || "",
      odds: safeDisplayValue(lock.odds),
      confidence: safeDisplayValue(lock.confidence),
      unit: safeDisplayValue(lock.units), // Map from units to unit for form
      analysis: lock.analysis || "",
      status: lock.status || "draft",
    })

    console.log("Editing lock with unit value:", lock.units)

    setIsEditDialogOpen(true)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!editingLock) return

    if (!validateForm(formData)) {
      toast.error("Please fill in all required fields")
      return
    }

    // Create update request data matching your API structure
    const lockData: UpdateLockRequest = {
      sport: formData.sport === "custom" ? formData.customSport : formData.sport,
      game: formData.game,
      pick: formData.pick,
      odds: formData.odds,
      confidence: formData.confidence,
      unit: formData.unit, // This will be sent as "unit" to match your API
      analysis: formData.analysis,
      status: formData.status as "draft" | "active" | "expired",
    }

    console.log("Updating lock with data:", lockData)

    try {
      await updateLockMutation.mutateAsync({ lockId: editingLock.id, lockData })
      setIsEditDialogOpen(false)
      setEditingLock(null)
      resetForm()
      toast.success("Lock updated successfully!")
    } catch (error) {
      console.error("Error updating lock:", error)
      toast.error("Failed to update lock. Please try again.")
    }
  }

  const handleDelete = (lock: Lock) => {
    setLockToDelete(lock)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!lockToDelete) return

    try {
      await deleteLockMutation.mutateAsync(lockToDelete.id)
      setDeleteDialogOpen(false)
      setLockToDelete(null)
      toast.success("Lock deleted successfully!")
    } catch (error) {
      console.error("Error deleting lock:", error)
      toast.error("Failed to delete lock. Please try again.")
    }
  }

  const getStatusBadge = (status: string, lock: Lock) => {
    const statusColors = {
      draft: "bg-gray-100 text-gray-800 hover:bg-gray-100",
      active: "bg-green-100 text-green-800 hover:bg-green-100",
      expired: "bg-red-100 text-red-800 hover:bg-red-100",
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Badge
            className={`cursor-pointer ${statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleStatusChange(lock, "draft")}>Draft</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange(lock, "active")}>Active</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusChange(lock, "expired")}>Expired</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const handleStatusChange = async (lock: Lock, newStatus: "draft" | "active" | "expired") => {
    try {
      await updateLockMutation.mutateAsync({
        lockId: lock.id,
        lockData: {
          sport: lock.sport,
          game: lock.game,
          pick: lock.pick,
          odds: safeDisplayValue(lock.odds),
          confidence: safeDisplayValue(lock.confidence),
          unit: safeDisplayValue(lock.units), // Map from units to unit for API
          analysis: lock.analysis,
          status: newStatus,
        },
      })
      toast.success("Lock status updated successfully!")
    } catch (error) {
      console.error("Error updating lock status:", error)
      toast.error("Failed to update lock status. Please try again.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Locks Management</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create Lock</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Lock</DialogTitle>
              <DialogDescription>Make a new lock to track.</DialogDescription>
            </DialogHeader>
            <LockForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              isSubmitting={createLockMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[100px]">Sport</TableHead>
              <TableHead>Game</TableHead>
              <TableHead>Pick</TableHead>
              <TableHead>Odds</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Units</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No locks found. Create your first lock to get started.
                </TableCell>
              </TableRow>
            ) : (
              locks.map((lock) => (
                <TableRow key={lock.id}>
                  <TableCell className="font-medium">{lock.sport || "N/A"}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{lock.game || "N/A"}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{lock.pick || "N/A"}</TableCell>
                  <TableCell>{safeDisplayValue(lock.odds)}</TableCell>
                  <TableCell>{safeDisplayValue(lock.confidence)}</TableCell>
                  <TableCell>{safeDisplayValue(lock.units)}</TableCell>
                  <TableCell>{getStatusBadge(lock.status, lock)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(lock)} className="flex items-center gap-2">
                          <Pencil className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(lock)}
                          className="flex items-center gap-2 text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                Showing {locks.length} of {totalLocks} locks (Page {currentPage} of {totalPages})
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing {Math.min((currentPage - 1) * 10 + 1, totalLocks)} to {Math.min(currentPage * 10, totalLocks)} of{" "}
            {totalLocks} locks
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Page</p>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0 bg-transparent"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage <= 1 || isLoading}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        className="h-8 w-8 p-0"
                        onClick={() => onPageChange(pageNum)}
                        disabled={isLoading}
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0 bg-transparent"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages || isLoading}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Lock</DialogTitle>
            <DialogDescription>Edit the lock details.</DialogDescription>
          </DialogHeader>
          <LockForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleUpdate}
            isEdit={true}
            isSubmitting={updateLockMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-600" />
              Delete Lock
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this lock? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {lockToDelete && (
            <div className="py-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium text-gray-900">{lockToDelete.game}</p>
                <p className="text-sm text-gray-600">{lockToDelete.pick}</p>
                <p className="text-sm text-gray-500">{lockToDelete.sport}</p>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteLockMutation.isPending}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={deleteLockMutation.isPending}>
              {deleteLockMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Deleting...
                </div>
              ) : (
                "Delete Lock"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
