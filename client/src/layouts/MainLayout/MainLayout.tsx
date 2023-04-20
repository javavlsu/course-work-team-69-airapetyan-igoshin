import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from '@mui/material'
import { Navigation } from '../../components/Navigation'

const Template = styled('div')(() => ({
  display: 'grid',
  gridTemplate: '50px 1fr / 1fr',
  height: '100vh'
}))
const NavigationWrapper = styled('nav')(() => ({
  gridRow: '1',
  gridColumn: '1',
  background: '#D9D9D9',
  display: 'flex',
  alignItems: 'center'
}))
const ContentWrapper = styled('div')(() => ({
  gridRow: '2',
  gridColumn: '1',
  overflow: 'hidden',
  height: '100%'
}))

export const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleAside = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Template>
      <NavigationWrapper>
        <Navigation toggleAside={toggleAside} />
      </NavigationWrapper>
      <ContentWrapper>
        <Outlet context={{ isAsideOpen: isOpen }} />
      </ContentWrapper>
    </Template>
  )
}
