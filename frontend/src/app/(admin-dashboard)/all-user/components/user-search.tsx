"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, X, Info, User, Mail } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { User as UserType } from "@/types/user"

interface UserSearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onClearSearch: () => void
  searchResult: UserType | null
  isSearching: boolean
  searchError: Error | null
  onEditUser: (user: UserType) => void
  onDeleteUser: (user: UserType) => void
}

export function UserSearch({
  searchQuery,
  onSearchChange,
  onClearSearch,
  searchResult,
  isSearching,
  searchError,
  onEditUser,
  onDeleteUser,
}: UserSearchProps) {
  const [showInfo, setShowInfo] = useState(false)

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      inactive: "secondary",
      cancelled: "destructive",
    } as const

    return <Badge variant={variants[status as keyof typeof variants] || "secondary"}>{status}</Badge>
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString()
  }

  const getFullName = (user: UserType) => {
    const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ")
    return fullName || "N/A"
  }

  const isValidEmail = (email: string) => {
    return email.includes("@") && email.includes(".")
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search user by email address..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowInfo(!showInfo)} className="shrink-0">
            <Info className="h-4 w-4" />
          </Button>
        </div>

        {showInfo && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Enter a complete email address to search for a specific user. The search will find exact email matches
              across the entire database.
            </AlertDescription>
          </Alert>
        )}

        {/* Search Status */}
        {searchQuery && (
          <div className="text-sm text-muted-foreground">
            {!isValidEmail(searchQuery) ? (
              <span className="text-amber-600">Please enter a valid email address</span>
            ) : isSearching ? (
              <span>Searching for user with email "{searchQuery}"...</span>
            ) : searchError ? (
              <span className="text-red-600">
                {searchError.message.includes("404") ? "No user found with this email address" : "Search failed"}
              </span>
            ) : searchResult ? (
              <span className="text-green-600">User found!</span>
            ) : null}
          </div>
        )}

        {/* Search Result */}
        {searchQuery && isValidEmail(searchQuery) && (
          <div className="border rounded-lg p-4">
            {isSearching ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-4 w-24" />
              </div>
            ) : searchResult ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{getFullName(searchResult)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{searchResult.email}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Phone: {searchResult.phoneNumber || "N/A"}</span>
                      <span>Status: {getStatusBadge(searchResult.subscriptionStatus)}</span>
                      <span>End Date: {formatDate(searchResult.subscriptionEndDate)}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => onEditUser(searchResult)}>
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onDeleteUser(searchResult)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ) : searchError && !searchError.message.includes("404") ? (
              <div className="text-center text-red-600 py-4">
                <p>Error searching for user</p>
                <p className="text-sm">{searchError.message}</p>
              </div>
            ) : searchError ? (
              <div className="text-center text-muted-foreground py-4">
                <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No user found with email "{searchQuery}"</p>
                <p className="text-sm">Try checking the email address for typos</p>
              </div>
            ) : null}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
