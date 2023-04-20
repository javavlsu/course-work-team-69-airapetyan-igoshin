import React, { FC, useState } from 'react'
import { Box, TextField } from '@mui/material'

interface ConfigSmartValue {
  value: string | number
  handleConfigValue: (v: string) => void
}

export const ConfigSmartValue: FC<ConfigSmartValue> = ({
  value,
  handleConfigValue
}) => {
  const [intermediateValue, setIntermediateValue] = useState(value)

  const handleInput = () => {
    handleConfigValue(intermediateValue.toString())
  }

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '5px'
      }}
    >
      <TextField
        variant="standard"
        value={intermediateValue}
        onChange={(v) => setIntermediateValue(v.target.value)}
        onBlur={handleInput}
      />
    </Box>
  )
}
