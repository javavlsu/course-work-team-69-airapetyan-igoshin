import '@mui/material'
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