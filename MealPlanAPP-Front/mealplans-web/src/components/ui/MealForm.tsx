// src/components/MealForm.tsx
import { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  IconButton,
  Divider,
  Tooltip,
  Box,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import type { MealPlan } from '../../types/MealPlan'

type Props = {
  defaultValues?: MealPlan
  onSubmit: (values: MealPlan) => void
}

export default function MealForm({ defaultValues, onSubmit }: Props) {
  const [form, setForm] = useState<MealPlan>(
    defaultValues ?? {
      patientName: '',
      startDate: '',
      endDate: '',
      totalCalories: 0,
      notes: '',
      meals: [{ name: '', time: '', description: '' }],
    }
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleMealChange = (i: number, field: string, value: string) => {
    const meals = [...form.meals]
    ;(meals[i] as any)[field] = value
    setForm({ ...form, meals })
  }

  const addMeal = () =>
    setForm({
      ...form,
      meals: [...form.meals, { name: '', time: '', description: '' }],
    })

  const removeMeal = (i: number) =>
    setForm({
      ...form,
      meals: form.meals.filter((_, idx) => idx !== i),
    })

  return (
    <Paper sx={{ p: 4, backgroundColor: 'background.paper' }}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(form)
        }}
      >
        <Grid container spacing={4}>
          {/* ===================== DADOS DO PACIENTE ===================== */}
          <Grid item xs={12}>
            <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
              Dados do Paciente
            </Typography>
            <Divider sx={{ mb: 3, borderColor: 'primary.main' }} />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Paciente"
                  name="patientName"
                  value={form.patientName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  type="date"
                  label="Início"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  type="date"
                  label="Fim"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Calorias totais"
                  name="totalCalories"
                  value={form.totalCalories}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Observações"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* ===================== REFEIÇÕES ===================== */}
          <Grid item xs={12}>
            <Typography variant="h6" color="secondary" sx={{ mt: 2, mb: 1 }}>
              Refeições
            </Typography>
            <Divider sx={{ mb: 3, borderColor: 'secondary.main' }} />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              {form.meals.map((m, i) => (
                <Grid container spacing={2} key={i} sx={{ mb: 2 }}>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Nome"
                      value={m.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleMealChange(i, 'name', e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      fullWidth
                      type="time"
                      label="Horário"
                      value={m.time}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleMealChange(i, 'time', e.target.value)
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Descrição"
                      value={m.description}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleMealChange(i, 'description', e.target.value)
                      }
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={1}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Tooltip title="Remover refeição">
                      <IconButton
                        color="error"
                        onClick={() => removeMeal(i)}
                        aria-label="remover refeição"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* ===================== BOTÕES ===================== */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outlined" color="secondary" onClick={addMeal}>
                + Refeição
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Salvar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}