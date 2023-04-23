import { IconButton, styled } from '@mui/material'
import { Link } from 'react-router-dom'

export const BlogName = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.appComponents.navbar.logoColor};
`

export const MenuIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.appComponents.navbar.menuColor};
`

export const NavigationWrapper = styled('div')`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  margin: 0 50px 0 40px;
`
