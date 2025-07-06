"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { lockApi } from "@/lib/lockofthedayApi"
import { useLockStore } from "@/store/lockStore"
import type { CreateLockRequest, UpdateLockRequest, PaginatedResponse, Lock } from "@/types/lock"
import { useEffect } from "react"

const LOCKS_QUERY_KEY = "locks"

export const useLocks = (page = 1, limit = 10) => {
  const { setLocks, setPagination, setLoading, setError } = useLockStore()

  const query = useQuery<PaginatedResponse<Lock>, Error>({
    queryKey: [LOCKS_QUERY_KEY, page, limit],
    queryFn: () => lockApi.getAllLocks(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    placeholderData: (previousData) => previousData, // Replaces keepPreviousData in newer versions
    refetchOnWindowFocus: false, // Prevent unnecessary refetches
  })

  // Update Zustand store when query data changes
  useEffect(() => {
    if (query.isLoading) {
      setLoading(true)
    } else {
      setLoading(false)
    }

    if (query.error) {
      setError(query.error.message)
    } else if (query.data) {
      setLocks(query.data.data)
      setPagination(query.data.pagination.page, query.data.pagination.totalPages, query.data.pagination.total)
      setError(null)
    }
  }, [query.data, query.isLoading, query.error, setLocks, setPagination, setLoading, setError])

  return query
}

export const useCreateLock = () => {
  const queryClient = useQueryClient()
  const { addLock, setError } = useLockStore()

  return useMutation({
    mutationFn: (lockData: CreateLockRequest) => lockApi.createLock(lockData),
    onSuccess: (response) => {
      addLock(response.data)
      // Invalidate and refetch locks query
      queryClient.invalidateQueries({ queryKey: [LOCKS_QUERY_KEY] })
    },
    onError: (error: Error) => {
      setError(error.message)
    },
  })
}

export const useUpdateLock = () => {
  const queryClient = useQueryClient()
  const { updateLock, setError } = useLockStore()

  return useMutation({
    mutationFn: ({ lockId, lockData }: { lockId: string; lockData: UpdateLockRequest }) =>
      lockApi.updateLock(lockId, lockData),
    onSuccess: (response, variables) => {
      updateLock(variables.lockId, response.data)
      // Invalidate and refetch locks query
      queryClient.invalidateQueries({ queryKey: [LOCKS_QUERY_KEY] })
    },
    onError: (error: Error) => {
      setError(error.message)
    },
  })
}

export const useDeleteLock = () => {
  const queryClient = useQueryClient()
  const { removeLock, setError } = useLockStore()

  return useMutation({
    mutationFn: (lockId: string) => lockApi.deleteLock(lockId),
    onSuccess: (_, lockId) => {
      removeLock(lockId)
      // Invalidate and refetch locks query
      queryClient.invalidateQueries({ queryKey: [LOCKS_QUERY_KEY] })
    },
    onError: (error: Error) => {
      setError(error.message)
    },
  })
}

export const useActiveLock = () => {
  return useQuery({
    queryKey: ["active-lock"],
    queryFn: () => lockApi.getActiveLock(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  })
}
