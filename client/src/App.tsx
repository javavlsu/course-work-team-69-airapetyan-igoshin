import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'
import { CssBaseline, Modal, styled } from '@mui/material'
import React, { useEffect } from 'react'
import './styles.css'
import modalStore from './store/modalStore'
import { observer } from 'mobx-react-lite'
import user from './domain/User'
import alertStore from './store/alertStore'
import { AppAlert } from './components/AppAlert'

const AppModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`
const AlertsWrapper = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
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
        <AlertsWrapper>
          {alertStore.alerts.map((alert, index) => (
            <AppAlert key={index} alert={alert} />
          ))}
        </AlertsWrapper>
        <AppRouter />
      </CssBaseline>
    </BrowserRouter>
  )
}

export default observer(App)
