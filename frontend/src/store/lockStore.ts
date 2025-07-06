import { create } from "zustand"
import type { Lock } from "@/types/lock"

interface LockStore {
  locks: Lock[]
  totalPages: number
  totalLocks: number
  currentPage: number
  isLoading: boolean
  error: string | null

  // Actions
  setLocks: (locks: Lock[]) => void
  addLock: (lock: Lock) => void
  updateLock: (lockId: string, updatedLock: Lock) => void
  removeLock: (lockId: string) => void
  setPagination: (page: number, totalPages: number, total: number) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setCurrentPage: (page: number) => void
  clearStore: () => void
}

const initialState = {
  locks: [],
  totalPages: 0,
  totalLocks: 0,
  currentPage: 1,
  isLoading: false,
  error: null,
}

export const useLockStore = create<LockStore>((set) => ({
  ...initialState,

  setLocks: (locks) => set({ locks }),

  addLock: (lock) =>
    set((state) => ({
      locks: [lock, ...state.locks],
      totalLocks: state.totalLocks + 1,
    })),

  updateLock: (lockId, updatedLock) =>
    set((state) => ({
      locks: state.locks.map((lock) => (lock.id === lockId ? updatedLock : lock)),
    })),

  removeLock: (lockId) =>
    set((state) => ({
      locks: state.locks.filter((lock) => lock.id !== lockId),
      totalLocks: Math.max(0, state.totalLocks - 1),
    })),

  setPagination: (page, totalPages, total) =>
    set({
      currentPage: page,
      totalPages,
      totalLocks: total,
    }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setCurrentPage: (currentPage) => set({ currentPage }),

  clearStore: () => set(initialState),
}))
