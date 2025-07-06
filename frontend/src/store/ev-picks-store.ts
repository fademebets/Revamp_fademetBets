import { create } from "zustand"
import type { EvPick } from "@/types/ev"

interface EvPicksState {
  evPicks: EvPick[]
  currentPage: number
  itemsPerPage: number
  searchTerm: string
  statusFilter: string
  isLoading: boolean
  error: string | null

  // Actions
  setEvPicks: (picks: EvPick[]) => void
  addEvPick: (pick: EvPick) => void
  updateEvPick: (id: string, pick: EvPick) => void
  removeEvPick: (id: string) => void
  setCurrentPage: (page: number) => void
  setSearchTerm: (term: string) => void
  setStatusFilter: (status: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  // Computed
  getPaginatedPicks: () => EvPick[]
  getTotalPages: () => number
  getFilteredPicks: () => EvPick[]
}

export const useEvPicksStore = create<EvPicksState>((set, get) => ({
  evPicks: [],
  currentPage: 1,
  itemsPerPage: 10,
  searchTerm: "",
  statusFilter: "all",
  isLoading: false,
  error: null,

  setEvPicks: (picks) => set({ evPicks: picks }),

  addEvPick: (pick) =>
    set((state) => ({
      evPicks: [pick, ...state.evPicks],
    })),

  updateEvPick: (id, updatedPick) =>
    set((state) => ({
      evPicks: state.evPicks.map((pick) => (pick._id === id ? updatedPick : pick)),
    })),

  removeEvPick: (id) =>
    set((state) => ({
      evPicks: state.evPicks.filter((pick) => pick._id !== id),
    })),

  setCurrentPage: (page) => set({ currentPage: page }),
  setSearchTerm: (term) => set({ searchTerm: term, currentPage: 1 }),
  setStatusFilter: (status) => set({ statusFilter: status, currentPage: 1 }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

 getFilteredPicks: () => {
  const { evPicks, searchTerm, statusFilter } = get()

  return evPicks.filter((pick) => {
    const matchesSearch =
      (pick.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pick.description || "").toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || pick.status === statusFilter

    return matchesSearch && matchesStatus
  })
},

  getPaginatedPicks: () => {
    const { currentPage, itemsPerPage } = get()
    const filteredPicks = get().getFilteredPicks()

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    return filteredPicks.slice(startIndex, endIndex)
  },

  getTotalPages: () => {
    const { itemsPerPage } = get()
    const filteredPicks = get().getFilteredPicks()

    return Math.ceil(filteredPicks.length / itemsPerPage)
  },
}))
