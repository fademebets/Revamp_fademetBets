"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { User } from "@/types/user"
import { useDeleteUser } from "@/hooks/admin-user-hooks"

interface DeleteUserDialogProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteUserDialog({ user, open, onOpenChange }: DeleteUserDialogProps) {
  const deleteUserMutation = useDeleteUser()

  const handleDelete = () => {
    if (!user) return

    deleteUserMutation.mutate(user._id, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  if (!user) return null

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ") || "Unnamed User"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action is irreversible. This will permanently delete <strong>{fullName}</strong> ({user.email}) and all
            their data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={deleteUserMutation.isPending}
            variant="destructive"
          >
            {deleteUserMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
