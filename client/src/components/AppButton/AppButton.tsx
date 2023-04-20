import React, { FC, ReactNode } from 'react'
import { Button } from '@mui/material'

interface AppButtonProps {
  children: ReactNode
  [x: string]: any
}

export const AppButton: FC<AppButtonProps> = (props) => {
  const { children } = props

  return (
    <Button
      {...props}
      sx={{ padding: '5px 15px', borderRadius: '10px' }}
      variant="contained"
    >
      {children}
    </Button>
  )
}
