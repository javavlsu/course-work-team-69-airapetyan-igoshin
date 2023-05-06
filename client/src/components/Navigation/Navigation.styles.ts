import { IconButton, styled } from '@mui/material'
import { Link } from 'react-router-dom'

export const BlogName = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.secondary.main};
`

export const MenuIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.palette.secondary.main};
`

export const NavigationWrapper = styled('div')`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  margin: 0 50px 0 40px;
`
