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

export const PostEdit = () => {
  const { register, handleSubmit } =
    useForm<Record<'title' | 'description', string>>()
  const publicPost = handleSubmit(({ title, description }) => {
    const content = editorStore.toHtml()
    const json = {
      title,
      description,
      content
    }

    console.log(json)
  })

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
          onClick={publicPost}
        >
          Опубликовать
        </PublishButton>
        <PublishButton variant={'outlined'} onClick={publicPost}>
          Сохранить в черновик
        </PublishButton>
      </PublishButtons>
    </PageContainer>
  )
}
