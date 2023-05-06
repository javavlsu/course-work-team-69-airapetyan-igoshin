import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createTheme,
  ThemeProvider,
  PaletteColorOptions,
  PaletteColor
} from '@mui/material'
import { CookiesProvider } from 'react-cookie'

declare module '@mui/material' {
  interface Palette {
    neutral: PaletteColor
    base: PaletteColor
    app: PaletteColor
  }

  interface PaletteOptions {
    neutral: PaletteColorOptions
    base: PaletteColorOptions
    app: PaletteColorOptions
  }

  interface ThemeOptions {
    boxShadows?: {
      main: string
    }
  }

  interface ButtonPropsColorOverrides {
    neutral: true
  }
}

const colors = {
  gray: '#BAB2B5',
  light: '#fff',
  light50: 'rgba(238,226,220,0.45)',
  light100: '#EEE2DC',
  pink: '#EDC7B7',
  blue: '#123C69',
  lightBlue: '#204a7b',
  red: '#AC3B61',
  redLight: 'rgba(178,31,77,0.67)',
  dark: '#000'
}
const theme = createTheme({
  palette: {
    secondary: {
      main: colors.red,
      light: colors.redLight,
      contrastText: colors.blue
    },
    neutral: {
      dark: colors.gray,
      main: colors.light50,
      light: colors.light100,
      contrastText: colors.blue
    },
    info: {
      main: colors.blue,
      light: colors.lightBlue,
      contrastText: colors.light
    },
    base: {
      main: colors.light,
      dark: colors.dark
    },
    app: {
      light: colors.pink,
      main: colors.light100,
      contrastText: colors.blue
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
