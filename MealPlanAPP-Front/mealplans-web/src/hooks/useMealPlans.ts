import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import type { MealPlan } from '../types/MealPlan'

export const useMealPlans = (search?: string) => {
  return useQuery<MealPlan[]>({
    queryKey: ['mealplans', search],
    queryFn: async () => {
      const { data } = await api.get('/mealplans', {
        params: search ? { patientName: search } : undefined,
      })
      return data
    },
  })
}