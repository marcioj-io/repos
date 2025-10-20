import { format } from 'date-fns'

export const formatDate = (iso: string) => {
  try {
    return format(new Date(iso), 'dd/MM/yyyy')
  } catch {
    return iso
  }
}

export const formatTime = (iso: string) => {
  try {
    return format(new Date(iso), 'HH:mm')
  } catch {
    return iso
  }
}