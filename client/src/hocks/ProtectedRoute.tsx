import { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import User from '../domain/User'

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  if (!User.getRole()) {
    return <Navigate to="/login" replace={true} />
  }

  return <>{children}</>
}
