import { PaletteMode } from '@mui/material'
import { makeAutoObservable } from 'mobx'

class ThemeStore {
  mode: PaletteMode = 'light'

  constructor() {
    makeAutoObservable(this)
  }
  setDarkTheme = () => {
    this.mode = 'dark'
  }

  setLightTheme = () => {
    this.mode = 'light'
  }
}

export default new ThemeStore()
