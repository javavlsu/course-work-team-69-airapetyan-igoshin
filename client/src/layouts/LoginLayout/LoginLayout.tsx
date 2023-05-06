import React from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from '@mui/material'

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

export const LoginLayout = () => {
  return (
    <LoginLayoutWrapper>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </LoginLayoutWrapper>
  )
}
