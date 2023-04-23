import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createTheme, PaletteColor, ThemeProvider } from '@mui/material'
import { CookiesProvider } from 'react-cookie'

interface ExtendedTheme {
  appComponents: {
    navbar: {
      background: string
      logoColor: string
      menuColor: string
      avatar: {
        text: string
        border: string
        dropdownBackground: string
        dropdownColor: string
      }
      button: {
        color: string
        background: string
      }
    }
    app: {
      color: string
      background: string
    }
    aside: {
      color: string
      background: string
      dividerColor: string
      selected: string
      menuItemBackground: string
      menuItemColor: string
      selectedText: string
    }
    postPreview: {
      background: string
      color: string
    }
    searchBar: {
      background: string
      color: string
    }
    expansionPanel: {
      background: string
      color: string
    }
    login: {
      background: string
      color: string
      formBackground: string
      formColor: string
    }
    blogCard: {
      background: string
      color: string
    }
  }
  boxShadow: {
    lightBlue: string
  }
}

interface ExtendedPalette {
  actionButton: PaletteColor
}

declare module '@mui/material' {
  interface PaletteOptions extends ExtendedPalette {
    postColors: {
      main: string
    }
  }

  interface Palette {
    postColors: {
      main: string
    }
    actionButton: PaletteColor
  }

  interface Theme extends ExtendedTheme {
    s?: string
  }

  interface ThemeOptions extends ExtendedTheme {
    s?: string
  }
}

const colors = {
  gray: '#BAB2B5',
  light: '#fff',
  light50: 'rgba(238,226,220,0.45)',
  light100: '#EEE2DC',
  pink: '#EDC7B7',
  blue: '#123C69',
  red: '#AC3B61',
  redLight: 'rgba(178,31,77,0.67)'
}
const theme = createTheme({
  palette: {
    postColors: {
      main: '#000'
    },
    actionButton: {
      main: colors.blue,
      contrastText: colors.light,
      light: colors.blue,
      dark: colors.blue
    }
  },
  appComponents: {
    navbar: {
      background: colors.light100,
      logoColor: colors.red,
      menuColor: colors.red,
      avatar: {
        text: colors.red,
        border: colors.pink,
        dropdownBackground: colors.light100,
        dropdownColor: colors.blue
      },
      button: {
        color: colors.light,
        background: colors.blue
      }
    },
    app: {
      color: colors.blue,
      background: colors.light50
    },
    aside: {
      color: colors.blue,
      background: colors.light100,
      dividerColor: colors.gray,
      menuItemBackground: colors.light100,
      menuItemColor: colors.blue,
      selected: colors.pink,
      selectedText: colors.blue
    },
    postPreview: {
      background: colors.light100,
      color: colors.blue
    },
    searchBar: {
      background: colors.light100,
      color: colors.blue
    },
    expansionPanel: {
      background: colors.light,
      color: colors.blue
    },
    login: {
      background: colors.light50,
      color: colors.blue,
      formBackground: colors.light100,
      formColor: colors.blue
    },
    blogCard: {
      background: colors.light50,
      color: colors.blue
    }
  },
  boxShadow: {
    lightBlue: '0 0 12px rgba(18, 60, 105, 0.1)'
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CookiesProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </CookiesProvider>
)
