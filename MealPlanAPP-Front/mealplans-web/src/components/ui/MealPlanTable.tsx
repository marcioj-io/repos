// src/components/MealPlanTable.tsx
import { Link } from 'react-router-dom'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Button, Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import type { MealPlan } from '../../types/MealPlan'

type Props = {
  plans: MealPlan[]
  onDelete: (id: string) => void
}

export default function MealPlanTable({ plans, onDelete }: Props) {
  return (
    <Paper sx={{ p: 2, backgroundColor: 'background.paper' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Typography variant="h6" color="primary">
          Planos Alimentares
        </Typography>
        <Button
          component={Link}
          to="/new"
          variant="contained"
          color="primary"
        >
          + Novo Plano
        </Button>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
              <TableCell>Paciente</TableCell>
              <TableCell>Início</TableCell>
              <TableCell>Fim</TableCell>
              <TableCell>Calorias</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans.map((p, idx) => (
              <TableRow
                key={p.id}
                sx={{
                  backgroundColor: idx % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                  '&:hover': { backgroundColor: 'rgba(0,200,111,0.1)' }, // verde PicPay no hover
                }}
              >
                <TableCell>{p.patientName}</TableCell>
                <TableCell>{p.startDate}</TableCell>
                <TableCell>{p.endDate}</TableCell>
                <TableCell>{p.totalCalories}</TableCell>
                <TableCell align="right">
                  <IconButton
                    component={Link}
                    to={`/edit/${p.id}`}
                    color="secondary"
                    aria-label="editar"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(p.id!)}
                    color="error"
                    aria-label="excluir"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {plans.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  Nenhum plano cadastrado ainda
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}