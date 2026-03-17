import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import { theme } from './config/theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
