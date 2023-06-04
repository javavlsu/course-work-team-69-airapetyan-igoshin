import { useNavigate, useSearchParams } from 'react-router-dom'
import editorStore from '../store/editorStore'
import Post from '../domain/Post'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { IPost } from '../utils/globalTypes'
import { checkUserRights } from '../utils/checkUserRights'
import alertStore from '../store/alertStore'
import { UpdatedPost } from '../service/Post/Post.types'

export const usePostEdit = () => {
  const navigate = useNavigate()
  const [currentPostId, setCurrentPostId] = useState<number | null>(null)
  const [showExitDraftModal, setShowExitDraftModal] = useState(false)
  const { register, handleSubmit, setValue } =
    useForm<Record<'title' | 'description', string>>()
  const [searchParams] = useSearchParams()
  const [post, setPost] = useState<IPost>()

  const exitEditor = (to = '/') => {
    navigate(to)
    editorStore.clear()
  }

  const handleCloseExitDraftModal = (isExit = true) => {
    if (isExit) exitEditor()
    setShowExitDraftModal(false)
  }

  const handleUpdatePost = async (json: UpdatedPost) => {
    await Post.updatePost(json)
    alertStore.create({
      type: 'success',
      children: 'Пост успешно обновлен!'
    })
    if (json.isDraft) setShowExitDraftModal(true)
    else exitEditor(`/post/${json.id}`)
  }
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
      // id comes from BE and search params. CurrentPostId is sets by save to draft
      const postId = currentPostId || id

      if (postId) return handleUpdatePost({ ...json, id: postId })

      // publish post
      const res = await Post.publishPost(json)

      if (!res)
        return alertStore.create({
          type: 'error',
          children: `Упс.. Произошла ошибка`
        })

      if (!isDraft) {
        // Пост опубликован
        setValue('title', '')
        setValue('description', '')
        exitEditor(`/post/${res.postId}`)
        alertStore.create({
          type: 'success',
          children: `Пост успешно создан
            }!`
        })
        return
      }

      // Черновик
      setCurrentPostId(res.postId)
      alertStore.create({
        type: 'success',
        children: `Пост успешно сохранен!`
      })
      setShowExitDraftModal(true)
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
    post,
    showExitDraftModal,
    handleCloseExitDraftModal
  }
}
