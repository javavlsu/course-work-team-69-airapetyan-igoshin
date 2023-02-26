import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {experimental_extendTheme as extendTheme, Experimental_CssVarsProvider as CssVarsProvider} from '@mui/material/styles'
import {green} from "@mui/material/colors";

declare module '@mui/material/styles' {
  interface PaletteOptions {
    sizes: {
      big: string,
      medium: string,
      normal: string,
      small: string,
    };
  }
  interface Palette {
    sizes: {
      big: string,
      medium: string,
      normal: string,
      small: string,
    };
  }
}

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: green[600],
        },
        sizes: {
          big: '30px',
          medium: '20px',
          normal: '16px',
          small: '12px',
        }
      }
    }
  },

})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CssVarsProvider theme={theme}>
    <App />
  </CssVarsProvider>
)
