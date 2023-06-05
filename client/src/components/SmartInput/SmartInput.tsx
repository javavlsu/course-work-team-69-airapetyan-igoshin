import React, { FC } from 'react'
import { styled, TextField } from '@mui/material'

interface SmartInputProps {
  type?: string
  placeholder: string
  editable?: boolean
  value?: string | Date | boolean
  className?: string
  variant?: 'filled' | 'outlined' | 'standard'
  inputProps?: any
}

const SmartTextField = styled('p')`
  padding: 0;
  margin: 0;
  font-size: 16px;
`

export const SmartInput: FC<SmartInputProps> = ({
  editable,
  placeholder,
  type = 'text',
  value,
  className,
  variant = 'outlined',
  inputProps
}) => {
  return (
    <>
      {editable ? (
        <TextField
          variant={variant}
          placeholder={placeholder}
          type={type}
          {...inputProps}
        />
      ) : (
        <SmartTextField className={className}>{String(value)}</SmartTextField>
      )}
    </>
  )
}
