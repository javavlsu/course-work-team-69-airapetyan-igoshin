import React, { FC } from 'react'
import { Box, Button, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { UserPreview } from '../UserPreviewDetails'
import { useNavigate } from 'react-router-dom'
import {
  MenuIconButton,
  BlogName,
  NavigationWrapper
} from './Navigation.styles'
import userStore from '../../store/userStore'
import { observer } from 'mobx-react-lite'
import { ThemeToggler } from '../ThemeToggler'

interface NavigationProps {
  toggleAside: () => void
}

const Navigation: FC<NavigationProps> = ({ toggleAside }) => {
  const navigate = useNavigate()

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
        <ThemeToggler />
        {userStore.isAuth ? (
          <UserPreview />
        ) : (
          <>
            <Button onClick={() => navigate('/login')}>Войти</Button>
            <Button
              variant={'outlined'}
              onClick={() => navigate('/login/new-user')}
              color={'info'}
            >
              Регистрация
            </Button>
          </>
        )}
      </Box>
    </NavigationWrapper>
  )
}

export default observer(Navigation)
