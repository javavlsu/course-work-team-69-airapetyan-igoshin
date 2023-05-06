import { useForm } from 'react-hook-form'
import { TextField, Typography } from '@mui/material'
import { TextEditor } from '../../components/TextEditor'
import {
  EditArea,
  PageContainer,
  PublishButtons,
  PublishButton
} from './PostEdit.styles'
import editorStore from '../../store/editorStore'
import { useSearchParams } from 'react-router-dom'
import Post from '../../domain/Post'

export const PostEdit = () => {
  const [searchParams] = useSearchParams()
  const { register, handleSubmit } =
    useForm<Record<'title' | 'description', string>>()
  const publicPost = (isDraft: boolean) =>
    handleSubmit(({ title, description }) => {
      const content = editorStore.toHtml()
      const blogId = searchParams.get('blogId')

      if (!blogId) {
        console.log('Не получили blogId')
        // Вызов Алерта нужен на странице
      }

      const json = {
        blogId: Number(blogId),
        title,
        description,
        content,
        isDraft
      }

      Post.publishPost(json)
    })()

  return (
    <PageContainer>
      <Typography variant={'h2'}>Создание поста</Typography>
      <TextField
        {...register('title', { required: true })}
        label={'Заголовок'}
      />
      <TextField
        {...register('description', { required: true })}
        label={'Описание'}
      />
      <EditArea>
        <TextEditor />
      </EditArea>
      <PublishButtons>
        <PublishButton
          variant={'contained'}
          color={'success'}
          onClick={() => publicPost(false)}
        >
          Опубликовать
        </PublishButton>
        <PublishButton variant={'outlined'} onClick={() => publicPost(true)}>
          Сохранить в черновик
        </PublishButton>
      </PublishButtons>
    </PageContainer>
  )
}
