import { FC } from 'react'
import { Typography } from '@mui/material'
import { Comment, CommentProps } from '../Comment'
import { observer } from 'mobx-react-lite'

const PostComments: FC<{ comments: CommentProps[] }> = ({ comments }) => {
  if (!comments) return null
  return (
    <>
      <Typography variant={'h5'} sx={{ marginBottom: '15px' }}>
        Комментарии <strong>{comments.length}</strong>
      </Typography>
      {comments.map((comment, index) => (
        <Comment
          author={comment.author}
          date={comment.date}
          text={comment.text}
          key={index}
        />
      ))}
    </>
  )
}

export default observer(PostComments)
