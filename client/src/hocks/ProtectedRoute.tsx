import { FC, PropsWithChildren } from 'react'
import UserStore from '../store/userStore'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  if (!UserStore.isAuth) {
    return <Navigate to="/login" replace={true} />
  }

  return <>{children}</>
}
