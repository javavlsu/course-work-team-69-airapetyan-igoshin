import { PageNotFoundRoot, PageNotFoundImage } from './PageNotFound.styles'
import PageNotFoundPic from './assets/PageNotFound.png'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const PageNotFound = () => {
  const navigate = useNavigate()

  const redirectToHome = () => {
    navigate('/')
  }

  return (
    <PageNotFoundRoot>
      <PageNotFoundImage src={PageNotFoundPic} />
      <Button variant={'contained'} onClick={redirectToHome}>
        To Home
      </Button>
    </PageNotFoundRoot>
  )
}

export default PageNotFound
