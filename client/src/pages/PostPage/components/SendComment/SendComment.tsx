import { Button, Typography } from '@mui/material'
import {
  ButtonsBlock,
  CommentText,
  SendCommentRoot
} from './SendComment.styles'
import stubComments from '../../../../store/stubComments'
import userStore from '../../../../store/userStore'
import { useForm } from 'react-hook-form'

const SendComment = () => {
  const { register, getValues, setValue } = useForm()

  const handleSend = () => {
    stubComments.add({
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
