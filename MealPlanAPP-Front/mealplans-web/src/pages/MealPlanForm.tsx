// src/pages/MealPlanForm.tsx
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../services/api'
import {
  Container,
  Typography,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material'
import type { MealPlan } from '../types/MealPlan'
import MealForm from '../components/ui/MealForm'

export default function MealPlanFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<MealPlan | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  // Carregar dados se for edição
  useEffect(() => {
    if (id) {
      setLoading(true)
      api.get(`/mealplans/${id}`)
        .then((res) => setFormData(res.data))
        .catch(() => setFeedback({ type: 'error', msg: 'Erro ao carregar plano' }))
        .finally(() => setLoading(false))
    }
  }, [id])

  const handleSubmit = async (values: MealPlan) => {
    try {
      setSaving(true)
      if (id) {
        await api.put(`/mealplans/${id}`, values)
        setFeedback({ type: 'success', msg: 'Plano atualizado com sucesso!' })
      } else {
        await api.post('/mealplans', values)
        setFeedback({ type: 'success', msg: 'Plano criado com sucesso!' })
      }
      navigate('/')
    } catch {
      setFeedback({ type: 'error', msg: 'Erro ao salvar plano' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Container sx={{ py: 4 }}>
      <Paper sx={{ p: 4, backgroundColor: 'background.paper' }}>
        <Typography variant="h5" gutterBottom color="primary">
          {id ? 'Editar Plano Alimentar' : 'Novo Plano Alimentar'}
        </Typography>

        {loading ? (
          <div className="flex justify-center py-10">
            <CircularProgress color="primary" />
          </div>
        ) : (
          <MealForm
            defaultValues={formData ?? undefined}
            onSubmit={handleSubmit}
          />
        )}
      </Paper>

      <Snackbar
        open={!!feedback}
        autoHideDuration={3000}
        onClose={() => setFeedback(null)}
      >
        {feedback && (
          <Alert
            severity={feedback.type}
            onClose={() => setFeedback(null)}
            variant="filled"
          >
            {feedback.msg}
          </Alert>
        )}
      </Snackbar>
    </Container>
  )
}