import React, { forwardRef } from 'react'
import {
  BlogDescription,
  BlogFormRoot,
  BlogFormTitle,
  BlogFromTextField
} from './BlogForm.styles'
import { useForm } from 'react-hook-form'
import { createBlog } from '../../../../service/Blog/Blog.api'
import { BlogCreateData } from '../../../../service/Blog/Blog.types'
import { Button } from '@mui/material'
import alertStore from '../../../../store/alertStore'
import modalStore from '../../../../store/modalStore'
import User from '../../../../domain/User'

const BlogForm = forwardRef<HTMLFormElement>((props, ref) => {
  const { register, handleSubmit } = useForm<BlogCreateData>()
  const submit = handleSubmit(async (data, event) => {
    event?.preventDefault()
    const isSuccess = await createBlog(data)

    if (isSuccess) {
      alertStore.create({
        type: 'success',
        children: 'Блог успешно создан!'
      })
      modalStore.close()
      User.getUserData()
    }
  })

  return (
    <BlogFormRoot onSubmit={submit} ref={ref}>
      <BlogFormTitle>Создание блога</BlogFormTitle>
      <BlogFromTextField {...register('name')} label={'name'} />
      <BlogDescription
        {...register('description')}
        placeholder={'Description...'}
        rows={2}
      />
      <Button variant={'contained'} type={'submit'}>
        Создать
      </Button>
    </BlogFormRoot>
  )
})

BlogForm.displayName = 'BlogForm'

export default BlogForm
