import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Box, Typography, styled } from '@mui/material'

const LoginLayoutWrapper = styled('section')`
  display: grid;
  grid-template: 1fr / 3fr 2fr;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.palette.base.main};
  color: ${({ theme }) => theme.palette.text.secondary};
`
const ContentWrapper = styled('div')`
  grid-column: 2;
  height: 100%;
  background: ${({ theme }) => theme.palette.app.main};
  color: ${({ theme }) => theme.palette.app.contrastText};
  display: flex;
  align-items: center;
`

export const BlogName = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.secondary.main};
  display: inline-block;
`

export const LoginLayout = () => {
  return (
    <LoginLayoutWrapper>
      <Box sx={{ padding: '20px' }}>
        <BlogName to="/">
          <Typography variant="h1" sx={{ fontSize: '40px', fontWeight: 300 }}>
            CustomBlog
          </Typography>
        </BlogName>
      </Box>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </LoginLayoutWrapper>
  )
}
