import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from '@mui/material'
import { TextEditor } from '../../components/TextEditor'
import {
  EditArea,
  PageContainer,
  PublishButtons,
  PublishButton
} from './PostEdit.styles'
import { usePostEdit } from '../../hooks/usePostEdit'

export const PostEdit = () => {
  const {
    register,
    post,
    publishPost,
    showExitDraftModal,
    handleCloseExitDraftModal
  } = usePostEdit()

  return (
    <PageContainer>
      <Typography variant={'h2'}>Создание поста</Typography>
      <TextField
        InputLabelProps={{ shrink: true }}
        {...register('title', { required: true })}
        label={'Заголовок'}
      />
      <TextField
        InputLabelProps={{ shrink: true }}
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
            color={post.isDraft ? 'success' : 'warning'}
            onClick={() => publishPost({ isDraft: false, id: post?.id })}
          >
            {post.isDraft ? 'Опубликовать' : 'Опубликовать повторно'}
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
      <Dialog
        open={showExitDraftModal}
        onClose={() => handleCloseExitDraftModal()}
      >
        <DialogTitle>Хотите остаться и продолжить редактирование?</DialogTitle>
        <DialogContent>
          После вашего ухода все изменения будут сохранены и вы сможете
          вернуться к посту позднее
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseExitDraftModal()}>Уйти</Button>
          <Button onClick={() => handleCloseExitDraftModal(false)} autoFocus>
            Остаться
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  )
}
