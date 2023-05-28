import { darkColors, colors } from './colors'

export const darkTheme = {
  neutral: {
    dark: darkColors.black2,
    main: 'blue',
    light: darkColors.black3,
    contrastText: darkColors.light
  },
  base: {
    main: '#181818',
    dark: 'black'
  },
  app: {
    light: '#3D3D3D',
    main: '#212121',
    contrastText: darkColors.light
  },
  secondary: {
    main: colors.red,
    light: colors.redLight,
    contrastText: colors.blue
  }
}
