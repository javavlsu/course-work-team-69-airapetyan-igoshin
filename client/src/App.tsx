import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'
import { CssBaseline, Modal, ThemeProvider, styled } from '@mui/material'
import { useEffect, useMemo } from 'react'
import './styles.css'
import modalStore from './store/modalStore'
import { observer } from 'mobx-react-lite'
import user from './domain/User'
import alertStore from './store/alertStore'
import { AppAlert } from './components/AppAlert'
import themeStore from './store/themeStore'
import { getTheme } from './theme'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

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
  const theme = useMemo(() => {
    return getTheme(themeStore.mode)
  }, [themeStore.mode])

  useEffect(() => {
    user.getUserData()
  }, [])
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </LocalizationProvider>
  )
}

export default observer(App)
