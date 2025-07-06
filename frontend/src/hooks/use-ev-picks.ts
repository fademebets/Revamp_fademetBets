import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getAllEvPicks, createEvPick, updateEvPick, deleteEvPick } from "@/lib/ev-picks"
import { useEvPicksStore } from "@/store/ev-picks-store"
import type { UpdateEvPickData } from "@/types/ev"

export const useEvPicks = () => {
  const { setEvPicks, setLoading, setError } = useEvPicksStore()

  return useQuery({
    queryKey: ["ev-picks"],
    queryFn: async () => {
      setLoading(true)
      try {
        const data = await getAllEvPicks()
        setEvPicks(data.evs)
        setError(null)
        return data.evs
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch EV picks"
        setError(errorMessage)
        toast.error(errorMessage)
        throw error
      } finally {
        setLoading(false)
      }
    },
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
  })
}

export const useCreateEvPick = () => {
  const queryClient = useQueryClient()
  const { addEvPick } = useEvPicksStore()

  return useMutation({
    mutationFn: createEvPick,
    onSuccess: (newPick) => {
      addEvPick(newPick)
      queryClient.invalidateQueries({ queryKey: ["ev-picks"] })
      toast.success("EV pick created successfully!")
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : "Failed to create EV pick"
      toast.error(errorMessage)
    },
  })
}


export const useUpdateEvPick = () => {
  const queryClient = useQueryClient()
  const { updateEvPick: updateEvPickInStore } = useEvPicksStore()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEvPickData }) => updateEvPick(id, data),
    onSuccess: (updatedPick, { id }) => {
      updateEvPickInStore(id, updatedPick)
      queryClient.invalidateQueries({ queryKey: ["ev-picks"] })
      toast.success("EV pick updated successfully!")
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : "Failed to update EV pick"
      toast.error(errorMessage)
    },
  })
}


export const useDeleteEvPick = () => {
  const queryClient = useQueryClient()
  const { removeEvPick } = useEvPicksStore()

  return useMutation({
    mutationFn: deleteEvPick,
    onSuccess: (_, id) => {
      removeEvPick(id)
      queryClient.invalidateQueries({ queryKey: ["ev-picks"] })
      toast.success("EV pick deleted successfully!")
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete EV pick"
      toast.error(errorMessage)
    },
  })
}
