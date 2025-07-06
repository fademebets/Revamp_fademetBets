"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { User, UpdateUserData } from "@/types/user"
import { useUpdateUser } from "@/hooks/admin-user-hooks"

interface EditUserDialogProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditUserDialog({ user, open, onOpenChange }: EditUserDialogProps) {
  const [formData, setFormData] = useState<UpdateUserData>({})
  const updateUserMutation = useUpdateUser()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    updateUserMutation.mutate(
      { userId: user._id, data: formData },
      {
        onSuccess: () => {
          onOpenChange(false)
          setFormData({})
        },
      },
    )
  }

  const handleInputChange = (field: keyof UpdateUserData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Make changes to the user information here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input
                id="firstName"
                defaultValue={user.firstName || ""}
                className="col-span-3"
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastName"
                defaultValue={user.lastName || ""}
                className="col-span-3"
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue={user.email}
                className="col-span-3"
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Phone
              </Label>
              <Input
                id="phoneNumber"
                defaultValue={user.phoneNumber || ""}
                className="col-span-3"
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subscriptionStatus" className="text-right">
                Status
              </Label>
              <Select
                defaultValue={user.subscriptionStatus}
                onValueChange={(value) => handleInputChange("subscriptionStatus", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subscriptionEndDate" className="text-right">
                End Date
              </Label>
              <Input
                id="subscriptionEndDate"
                type="date"
                defaultValue={
                  user.subscriptionEndDate ? new Date(user.subscriptionEndDate).toISOString().split("T")[0] : ""
                }
                className="col-span-3"
                onChange={(e) => handleInputChange("subscriptionEndDate", e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={updateUserMutation.isPending}>
              {updateUserMutation.isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
