import { FC } from 'react'
import { Avatar } from '@mui/material'
import {
  AuthorName,
  CommentAvatar,
  CommentContent,
  CommentDate,
  CommentMain,
  CommentRoot
} from './Comment.styles'
import { CommentActions } from './components'
import { CommentProps } from './Comment.types'

const Comment: FC<CommentProps> = ({ author, date, text }) => {
  const formattedDate = date.toLocaleDateString()

  return (
    <CommentRoot>
      <CommentAvatar>
        <Avatar />
      </CommentAvatar>
      <CommentMain>
        <AuthorName>{author}</AuthorName>
        <CommentDate>{formattedDate}</CommentDate>
        <CommentContent>{text}</CommentContent>
        <CommentActions />
      </CommentMain>
    </CommentRoot>
  )
}

export default Comment
