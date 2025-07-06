import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { userApi } from "@/lib/admin-user-api"
import { useUserStore } from "@/store/admin-user-store"
import type { UpdateUserData, PaginationParams } from "@/types/user"
import { toast } from "sonner"

export const useUsers = (params: Omit<PaginationParams, "search">) => {
  const { setUsers, setPagination } = useUserStore()

  return useQuery({
    queryKey: ["users", params.page, params.limit],
    queryFn: async () => {
      const data = await userApi.getUsers(params)
      setUsers(data.users)
      setPagination(data.totalUsers, data.totalPages, data.currentPage)
      return data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useSearchUserByEmail = (email: string) => {
  return useQuery({
    queryKey: ["user-search", email],
    queryFn: () => userApi.searchUserByEmail(email),
    enabled: !!email && email.includes("@"), // Only search if email looks valid
    retry: false, // Don't retry on 404 (user not found)
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  const { updateUser } = useUserStore()

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: UpdateUserData }) => userApi.updateUser(userId, data),
    onSuccess: (_, { userId, data }) => {
      updateUser(userId, data)
      queryClient.invalidateQueries({ queryKey: ["users"] })
      queryClient.invalidateQueries({ queryKey: ["user-search"] })
      toast.success("User updated successfully")
    },
    onError: (error) => {
      toast.error("Failed to update user: " + error.message)
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  const { removeUser } = useUserStore()

  return useMutation({
    mutationFn: (userId: string) => userApi.deleteUser(userId),
    onSuccess: (_, userId) => {
      removeUser(userId)
      queryClient.invalidateQueries({ queryKey: ["users"] })
      queryClient.invalidateQueries({ queryKey: ["user-search"] })
      toast.success("User deleted successfully")
    },
    onError: (error) => {
      toast.error("Failed to delete user: " + error.message)
    },
  })
}
