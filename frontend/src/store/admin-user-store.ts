import { create } from "zustand"
import type { User } from "@/types/user"

interface UserStore {
  users: User[]
  totalUsers: number
  totalPages: number
  currentPage: number
  setUsers: (users: User[]) => void
  setPagination: (totalUsers: number, totalPages: number, currentPage: number) => void
  updateUser: (userId: string, updatedUser: Partial<User>) => void
  removeUser: (userId: string) => void
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  totalUsers: 0,
  totalPages: 0,
  currentPage: 1,
  setUsers: (users) => set({ users }),
  setPagination: (totalUsers, totalPages, currentPage) => set({ totalUsers, totalPages, currentPage }),
  updateUser: (userId, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) => (user._id === userId ? { ...user, ...updatedUser } : user)),
    })),
  removeUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user._id !== userId),
      totalUsers: state.totalUsers - 1,
    })),
}))
