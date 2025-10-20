export interface Meal {
  id?: string
  name: string
  time: string
  description?: string
}

export interface MealPlan {
  id?: string
  patientName: string
  startDate: string
  endDate: string
  totalCalories: number
  notes?: string
  meals: Meal[]
}