import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'
import { CssBaseline, Modal, styled } from '@mui/material'
import React, { useEffect } from 'react'
import './styles.css'
import modalStore from './store/modalStore'
import { observer } from 'mobx-react-lite'
import user from './domain/User'

const AppModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`

function App() {
  useEffect(() => {
    user.getUserData()
  }, [])
  return (
    <BrowserRouter>
      <CssBaseline enableColorScheme>
        <AppModal open={modalStore.isOpen} onClose={modalStore.close}>
          <>{modalStore.children}</>
        </AppModal>
        <AppRouter />
      </CssBaseline>
    </BrowserRouter>
  )
}

export default observer(App)
