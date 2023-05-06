import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import User from '../domain/User'
import UserStore from '../store/userStore'
import { Loader } from '../components/Loader'

export const ProtectedRoute: FC<PropsWithChildren> = ({
  children: pageContent
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  let children = null

  const onLoadPage = async () => {
    setIsLoaded(false)
    await User.getUserData()
    setIsLoaded(true)
  }

  useEffect(() => {
    onLoadPage()
  }, [])

  if (isLoaded) {
    if (UserStore.systemRole) {
      children = pageContent
    } else {
      children = <Navigate to="/login" replace={true} />
    }
  } else {
    children = <Loader />
  }

  return <>{children}</>
}
