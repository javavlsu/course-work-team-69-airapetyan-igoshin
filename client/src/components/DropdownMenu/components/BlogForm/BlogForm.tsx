import React, { forwardRef } from 'react'
import {
  BlogDescription,
  BlogFormRoot,
  BlogFormTitle,
  BlogFromTextField
} from './BlogForm.styles'
import { useForm } from 'react-hook-form'
import { AppButton } from '../../../AppButton'
import { createBlog } from '../../../../service/Blog/Blog.api'
import { BlogCreateData } from '../../../../service/Blog/Blog.types'

const BlogForm = forwardRef<HTMLFormElement>((props, ref) => {
  const { register, handleSubmit } = useForm<BlogCreateData>()
  const submit = handleSubmit(async (data, event) => {
    event?.preventDefault()
    const isSuccess = await createBlog(data)

    console.log('Блог создан?' + isSuccess)
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
      <AppButton type={'submit'}>Создать</AppButton>
    </BlogFormRoot>
  )
})

BlogForm.displayName = 'BlogForm'

export default BlogForm