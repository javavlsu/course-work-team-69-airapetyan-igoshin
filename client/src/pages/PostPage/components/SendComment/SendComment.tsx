import { Button, Typography } from '@mui/material'
import {
  ButtonsBlock,
  CommentText,
  SendCommentRoot
} from './SendComment.styles'
import stubComments from '../../../../store/stubComments'
import userStore from '../../../../store/userStore'
import { useForm } from 'react-hook-form'
import { FC } from 'react'

const SendComment: FC<{ postId?: number }> = ({ postId }) => {
  const { register, getValues, setValue } = useForm()

  const handleSend = () => {
    if (!postId) return
    stubComments.add(postId, {
      author: userStore.name,
      date: new Date(),
      text: getValues('commentText')
    })
    setValue('commentText', '')
  }

  return (
    <SendCommentRoot>
      <Typography variant={'h5'} sx={{ marginBottom: '10px' }}>
        Оставьте комментарий
      </Typography>
      <CommentText {...register('commentText')} />
      <ButtonsBlock>
        <Button variant={'contained'} onClick={handleSend}>
          Отправить
        </Button>
      </ButtonsBlock>
    </SendCommentRoot>
  )
}

export default SendComment
