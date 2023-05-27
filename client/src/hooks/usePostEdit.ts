import { useNavigate, useSearchParams } from 'react-router-dom'
import editorStore from '../store/editorStore'
import Post from '../domain/Post'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { IPost } from '../utils/globalTypes'
import { checkUserRights } from '../utils/checkUserRights'
import alertStore from '../store/alertStore'

export const usePostEdit = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, setValue } =
    useForm<Record<'title' | 'description', string>>()
  const [searchParams] = useSearchParams()
  const [post, setPost] = useState<IPost>()
  const publishPost = ({ isDraft, id }: { isDraft: boolean; id?: number }) =>
    handleSubmit(async ({ title, description }) => {
      const content = editorStore.toHtml()
      const blogId = searchParams.get('blogId')

      if (!blogId) {
        alertStore.create({
          type: 'error',
          children:
            'Что-то пошло не так. Скорее всего вы перешли не со страницы блога'
        })
      }

      const json = {
        blogId: Number(blogId),
        title,
        description,
        content,
        isDraft
      }

      if (id) {
        await Post.updatePost({ id, ...json })
        alertStore.create({
          type: 'success',
          children: 'Пост успешно обновлен!'
        })
      } else {
        const res = await Post.publishPost(json)

        if (!res)
          return alertStore.create({
            type: 'error',
            children: `Упс.. Произошла ошибка`
          })

        if (!isDraft) {
          setValue('title', '')
          setValue('description', '')
          editorStore.clear()
        }

        !isDraft && navigate(`/post/${res.postId}`)
        alertStore.create({
          type: 'success',
          children: `Пост успешно ${
            isDraft ? 'сохранен в черновик' : 'создан'
          }!`
        })
      }
    })()

  useEffect(() => {
    const postId = Number(searchParams.get('postId'))

    if (!postId) return

    Post.getPost(postId).then((post) => {
      if (!post) return
      else if (!checkUserRights(post)) {
        navigate('/not-found')
      }

      setPost(post)
      setValue('title', post.title)
      setValue('description', post.description)
    })
  }, [searchParams])

  return {
    publishPost,
    register,
    post
  }
}
