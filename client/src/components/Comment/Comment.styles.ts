import { styled } from '@mui/material'

export const CommentRoot = styled('div')`
  width: 100%;
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`

export const CommentAvatar = styled('div')`
  width: 40px;
`

export const CommentMain = styled('div')`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

export const AuthorName = styled('p')`
  font-size: 18px;
  margin: 0 0 4px 0;
`

export const CommentDate = styled('p')`
  font-size: 12px;
  margin: 0;
`

export const CommentContent = styled('p')`
  font-size: 14px;
  margin: 10px 0;
`
