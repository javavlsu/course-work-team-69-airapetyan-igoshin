import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from '@mui/material'
import { Navigation } from '../../components/Navigation'
import userStore from '../../store/userStore'
import LoaderPage from '../../hocks/LoaderPage'
import { observer } from 'mobx-react-lite'

const Template = styled('div')`
  display: grid;
  grid-template: 50px 1fr / 1fr;
  height: 100vh;
  color: ${({ theme }) => theme.palette.text.secondary};
  background: ${({ theme }) => theme.palette.neutral.main};
`
const NavigationWrapper = styled('nav')`
  grid-row: 1;
  grid-column: 1;
  background: ${({ theme }) => theme.palette.app.main};
  display: flex;
  align-items: center;
`
const ContentWrapper = styled('div')(() => ({
  gridRow: '2',
  gridColumn: '1',
  overflow: 'hidden',
  height: '100%'
}))

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleAside = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Template>
      <LoaderPage
        loadingData={null}
        isLoaded={userStore.loaded}
        possibleEmptyData={true}
      >
        <NavigationWrapper>
          <Navigation toggleAside={toggleAside} />
        </NavigationWrapper>
        <ContentWrapper>
          <Outlet context={{ isAsideOpen: isOpen }} />
        </ContentWrapper>
      </LoaderPage>
    </Template>
  )
}

export default observer(MainLayout)
