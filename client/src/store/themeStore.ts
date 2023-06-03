import { PaletteMode } from '@mui/material'
import { makeAutoObservable } from 'mobx'

class ThemeStore {
  mode: PaletteMode = 'light'

  constructor() {
    const lsMode = localStorage.getItem('themeMode') as PaletteMode

    this.mode = lsMode ? lsMode : 'light'

    makeAutoObservable(this)
  }
  setDarkTheme = () => {
    localStorage.setItem('themeMode', 'dark')
    this.mode = 'dark'
  }

  setLightTheme = () => {
    localStorage.setItem('themeMode', 'light')
    this.mode = 'light'
  }
}

export default new ThemeStore()
