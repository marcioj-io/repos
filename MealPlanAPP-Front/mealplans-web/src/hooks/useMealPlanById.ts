import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import type { MealPlan } from '../types/MealPlan'

export const useMealPlanById = (id?: string) => {
  return useQuery<MealPlan>({
    queryKey: ['mealplan', id],
    queryFn: async () => {
      const { data } = await api.get(`/mealplans/${id}`)
      return data
    },
    enabled: Boolean(id),
  })
}