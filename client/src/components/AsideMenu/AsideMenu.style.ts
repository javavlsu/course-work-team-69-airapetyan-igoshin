import { styled } from '@mui/material'
import { AsideMenuProps } from './AsideMenu.types'

export const AsideMenuWrapper = styled('aside')<AsideMenuProps>(
  ({ isOpen, background, theme }) => ({
    gridRow: '1',
    gridColumn: isOpen ? '1 / 3' : '1',
    background: background || theme.palette.app.main,
    color: theme.palette.app.contrastText
  })
)
