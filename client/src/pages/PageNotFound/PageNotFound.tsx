import { AppButton } from '../../components/AppButton'
import { PageNotFoundRoot, PageNotFoundImage } from './PageNotFound.styles'
import PageNotFoundPic from './assets/PageNotFound.png'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()

  const redirectToHome = () => {
    navigate('/')
  }

  return (
    <PageNotFoundRoot>
      <PageNotFoundImage src={PageNotFoundPic} />
      <AppButton onClick={redirectToHome}>To Home</AppButton>
    </PageNotFoundRoot>
  )
}

export default PageNotFound
