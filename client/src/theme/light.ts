import { colors } from './colors'

export const lightTheme = {
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
