import React, { FC } from 'react'
import { Box, IconButton, styled, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { UserPreview } from '../UserPreviewDetails'
import { AppButton } from '../AppButton'
import { Link, useNavigate } from 'react-router-dom'

interface NavigationProps {
  toggleAside: () => void
}

const BlogName = styled(Link)`
  text-decoration: none;
  color: black;
`

export const Navigation: FC<NavigationProps> = ({ toggleAside }) => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        width: '100%',
        margin: '0 50px 0 40px'
      }}
    >
      <IconButton onClick={toggleAside} color="default">
        <MenuIcon />
      </IconButton>
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
        <AppButton onClick={() => navigate('/post-edit')}>
          <ControlPointIcon /> Создать
        </AppButton>
      </Box>
    </Box>
  )
}
