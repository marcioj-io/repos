import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#323232',
      paper: '#3A3A3A',
    },
    primary: {
      main: '#00C86F',
    },
    secondary: {
      main: '#2196F3',
    },
    error: {
      main: '#EF4444',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
})