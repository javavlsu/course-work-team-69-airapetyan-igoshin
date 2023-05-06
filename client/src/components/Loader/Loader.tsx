import { CircularProgress } from '@mui/material'
import { LoaderRoot } from './Loader.styles'

const Loader = () => {
  return (
    <LoaderRoot>
      <CircularProgress color={'secondary'} />
    </LoaderRoot>
  )
}

export default Loader
