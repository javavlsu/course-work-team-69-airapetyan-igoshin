import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'
import { CssBaseline } from '@mui/material'
import { useEffect } from 'react'
import User from './domain/User'

function App() {
  useEffect(() => {
    User.loadRole()
    console.log('loaded')
  }, [])
  return (
    <BrowserRouter>
      <CssBaseline enableColorScheme>
        <AppRouter />
      </CssBaseline>
    </BrowserRouter>
  )
}

export default App
