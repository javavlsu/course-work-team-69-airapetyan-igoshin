import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createTheme, ThemeProvider } from '@mui/material'
import { CookiesProvider } from 'react-cookie'

declare module '@mui/material/styles' {
  interface PaletteOptions {
    postColors: {
      main: string
    }
  }

  interface Palette {
    postColors: {
      main: string
    }
  }
}

const theme = createTheme({
  palette: {
    postColors: {
      main: '#000'
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CookiesProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </CookiesProvider>
)
