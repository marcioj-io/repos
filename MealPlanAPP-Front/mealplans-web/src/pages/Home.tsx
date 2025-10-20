import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import type { MealPlan } from '../types/MealPlan'
import MealPlanTable from '../components/ui/MealPlanTable'

export default function Home() {
  const [plans, setPlans] = useState<MealPlan[]>([])

  const load = async () => {
    const { data } = await api.get('/mealplans')
    setPlans(data)
  }

  const remove = async (id: string) => {
    await api.delete(`/mealplans/${id}`)
    load()
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Planos Alimentares
          </Typography>
          <Button component={Link} to="/new" color="inherit" variant="outlined">
            + Novo Plano
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <MealPlanTable plans={plans} onDelete={remove} />
      </Container>
    </>
  )
}