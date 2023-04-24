import { IconButton, styled } from '@mui/material'

export const ToolsWrapper = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const ToolsLine = styled('div')`
  width: 100%;
  display: flex;
  gap: 4px;
`

export const ToolsItem = styled(IconButton)`
  border-radius: 0;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`
