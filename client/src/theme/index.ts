import { PaletteMode, createTheme } from '@mui/material'
import { lightTheme } from './light'
import { darkTheme } from './dark'

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light' ? lightTheme : darkTheme)
    }
  })
