import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'

export const useDeleteMealPlan = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/mealplans/${id}`)
      return id
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mealplans'] })
    },
  })
}