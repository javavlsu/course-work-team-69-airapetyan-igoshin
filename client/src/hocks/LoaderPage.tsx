import { FC, PropsWithChildren } from 'react'
import { Loader } from '../components/Loader'
import { Navigate } from 'react-router-dom'

const LoaderPage: FC<
  PropsWithChildren<{
    loadingData: any
    isLoaded: boolean
    possibleEmptyData?: boolean
  }>
> = ({
  isLoaded,
  loadingData,
  children: pageContent,
  possibleEmptyData = false
}) => {
  let children = null

  if (!loadingData && !isLoaded) {
    children = <Loader />
  } else if (!loadingData && !possibleEmptyData && isLoaded) {
    children = <Navigate to={'/not-found'} />
  } else {
    children = pageContent
  }

  return <>{children}</>
}

export default LoaderPage
