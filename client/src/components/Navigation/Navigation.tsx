import React, { FC } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { UserPreview } from '../UserPreviewDetails'
import { AppButton } from '../AppButton'
import { useNavigate } from 'react-router-dom'
import {
  MenuIconButton,
  BlogName,
  NavigationWrapper
} from './Navigation.styles'

interface NavigationProps {
  toggleAside: () => void
}

export const Navigation: FC<NavigationProps> = ({ toggleAside }) => {
  const navigate = useNavigate()
  const theme = useTheme()

  return (
    <NavigationWrapper>
      <MenuIconButton onClick={toggleAside}>
        <MenuIcon />
      </MenuIconButton>
      <BlogName to="/">
        <Typography variant="h5">CustomBlog</Typography>
      </BlogName>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          width: '100%',
          gap: '20px'
        }}
      >
        <UserPreview />
        <AppButton
          sx={{
            color: theme.appComponents.navbar.button.color,
            background: theme.appComponents.navbar.button.background
          }}
          onClick={() => navigate('/post-edit')}
        >
          <ControlPointIcon /> Создать
        </AppButton>
      </Box>
    </NavigationWrapper>
  )
}
