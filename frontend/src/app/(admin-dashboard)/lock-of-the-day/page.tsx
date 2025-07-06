"use client"

import { LockAdmin } from "./_components/LockAdmin"
import { useLocks } from "@/hooks/useLocks"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useState } from "react"

export default function LocksAdminPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, error } = useLocks(currentPage, 10) // 10 locks per page

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (isLoading && !data) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load locks: {error instanceof Error ? error.message : "An unknown error occurred"}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <LockAdmin
        locks={data?.data || []}
        currentPage={currentPage}
        totalPages={data?.pagination?.totalPages || 1}
        totalLocks={data?.pagination?.total || 0}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </div>
  )
}
