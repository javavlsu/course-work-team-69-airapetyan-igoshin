import React, { FC } from 'react'
import { Box, Button, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { UserPreview } from '../UserPreviewDetails'
import { Link, useNavigate } from 'react-router-dom'
import {
  MenuIconButton,
  BlogName,
  NavigationWrapper
} from './Navigation.styles'
import userStore from '../../store/userStore'
import { observer } from 'mobx-react-lite'

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
        {userStore.isAuth ? (
          <>
            <UserPreview />
            <Button
              variant={'contained'}
              onClick={() => navigate('/post-edit')}
            >
              <ControlPointIcon /> Создать
            </Button>
          </>
        ) : (
          <Link to={'/login'}>Войти</Link>
        )}
      </Box>
    </NavigationWrapper>
  )
}

export default observer(Navigation)
