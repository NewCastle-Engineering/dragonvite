import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      marginBottom: '1rem',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 4,
  },
})
