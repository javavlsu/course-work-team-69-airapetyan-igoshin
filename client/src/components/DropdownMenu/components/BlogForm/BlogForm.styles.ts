import { styled, TextField } from '@mui/material'

export const BlogFormRoot = styled('form')`
  padding: 60px 30px;
  background: ${({ theme }) => theme.palette.app.light};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: 400px;
  border-radius: 10px;
  gap: 15px;
  overflow: hidden;
`

export const BlogFormTitle = styled('legend')`
  font-size: 24px;
`

export const BlogFromTextField = styled(TextField)`
  width: 100%;
`

export const BlogDescription = styled('textarea')`
  width: 100%;
  min-width: 100%;
  border-radius: 4px;
  border-color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? theme.palette.text.primary : '#cccccc'};
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
  &:focus {
    outline: 2px solid ${({ theme }) => theme.palette.app.main};
  }
`
