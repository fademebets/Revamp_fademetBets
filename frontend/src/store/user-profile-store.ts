import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { User } from "@/types/user-profile"
import { profileApi } from "@/lib/user-profile-api";

interface ProfileState {
  user: User | null
  isLoading: boolean
  error: string | null

  // Actions
  fetchProfile: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
  setUser: (user: User) => void
  clearError: () => void
}

export const useProfileStore = create<ProfileState>()(
  devtools(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,

      fetchProfile: async () => {
        set({ isLoading: true, error: null })
        try {
          const user = await profileApi.getProfile()
          set({ user, isLoading: false })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to fetch profile",
            isLoading: false,
          })
        }
      },

      updateProfile: async (data) => {
        set({ isLoading: true, error: null })
        try {
          const updateData = {
            firstName: data.firstName || get().user?.firstName || "",
            lastName: data.lastName || get().user?.lastName || "",
            phoneNumber: data.phoneNumber || get().user?.phoneNumber || "",
            address: data.address || get().user?.address || "",
          }

          const response = await profileApi.updateProfile(updateData)
          set({ user: response.user, isLoading: false })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to update profile",
            isLoading: false,
          })
          throw error
        }
      },

      setUser: (user) => set({ user }),

      clearError: () => set({ error: null }),
    }),
    {
      name: "profile-store",
    },
  ),
)
