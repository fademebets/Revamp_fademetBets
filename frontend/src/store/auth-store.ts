import { create } from "zustand"
import { persist } from "zustand/middleware"
import { authUtils } from "@/lib/auth"
import type { User } from "@/types/auth"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean

  // Actions
  setUser: (user: User) => void
  clearUser: () => void
  checkAuth: () => void
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user: User) => {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
      },

      clearUser: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
      },

      checkAuth: () => {
        try {
          const user = authUtils.getUser()
          const isAuth = authUtils.isAuthenticated()

          set({
            user,
            isAuthenticated: isAuth,
            isLoading: false,
          })
        } catch (error) {
          console.error("Auth check failed:", error)
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          })
        }
      },

      login: (user: User) => {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
      },

      logout: () => {
        authUtils.clearAllAuthData()
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
      },
    }),
    {
      name: "auth-storage",
      // Only persist essential data
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
