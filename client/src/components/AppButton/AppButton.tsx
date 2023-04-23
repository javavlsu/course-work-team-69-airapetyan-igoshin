import React, { FC, ReactNode } from 'react'
import { Button } from '@mui/material'

interface AppButtonProps {
  children: ReactNode
  [x: string]: any
}

export const AppButton: FC<AppButtonProps> = (props) => {
  const { children } = props

  return (
    <Button {...props} variant="contained">
      {children}
    </Button>
  )
}
