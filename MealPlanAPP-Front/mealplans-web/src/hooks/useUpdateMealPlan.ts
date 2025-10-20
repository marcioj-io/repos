import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'
import type { MealPlan } from '../types/MealPlan'

export const useUpdateMealPlan = (id: string) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload: MealPlan) => {
      const { data } = await api.put(`/mealplans/${id}`, payload)
      return data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mealplans'] })
      qc.invalidateQueries({ queryKey: ['mealplan', id] })
    },
  })
}