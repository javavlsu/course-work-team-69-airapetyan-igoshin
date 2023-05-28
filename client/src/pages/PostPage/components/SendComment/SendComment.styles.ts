import { styled } from '@mui/material'

export const SendCommentRoot = styled('div')`
  display: flex;
  flex-direction: column;
`

export const ButtonsBlock = styled('div')`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
`

export const CommentText = styled('textarea')`
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  border-radius: 4px;
  border-color: #cccccc;
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
  &:focus {
    outline: 2px solid ${({ theme }) => theme.palette.app.main};
  }
`
