import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../services/api'
import type { MealPlan } from '../types/MealPlan'

export const useCreateMealPlan = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload: MealPlan) => {
      const { data } = await api.post('/mealplans', payload)
      return data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mealplans'] })
    },
  })
}