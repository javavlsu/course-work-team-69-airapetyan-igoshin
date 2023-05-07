import { TextField, Typography } from '@mui/material'
import { TextEditor } from '../../components/TextEditor'
import {
  EditArea,
  PageContainer,
  PublishButtons,
  PublishButton
} from './PostEdit.styles'
import { usePostEdit } from '../../hooks/usePostEdit'

export const PostEdit = () => {
  const { register, post, publishPost } = usePostEdit()

  return (
    <PageContainer>
      <Typography variant={'h2'}>Создание поста</Typography>
      <TextField
        InputLabelProps={{ shrink: Boolean(post) }}
        {...register('title', { required: true })}
        label={'Заголовок'}
      />
      <TextField
        InputLabelProps={{ shrink: Boolean(post) }}
        {...register('description', { required: true })}
        label={'Описание'}
      />
      <EditArea>
        <TextEditor html={post?.content} />
      </EditArea>
      <PublishButtons>
        {post ? (
          <PublishButton
            variant={'contained'}
            color={'warning'}
            onClick={() => publishPost({ isDraft: false, id: post?.id })}
          >
            Опубликовать
          </PublishButton>
        ) : (
          <PublishButton
            variant={'contained'}
            color={'success'}
            onClick={() => publishPost({ isDraft: false })}
          >
            Опубликовать
          </PublishButton>
        )}
        <PublishButton
          variant={'outlined'}
          onClick={() => publishPost({ isDraft: true })}
        >
          Сохранить в черновик
        </PublishButton>
      </PublishButtons>
    </PageContainer>
  )
}
