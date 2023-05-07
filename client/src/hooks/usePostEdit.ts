import { useNavigate, useSearchParams } from 'react-router-dom'
import editorStore from '../store/editorStore'
import Post from '../domain/Post'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { IPost } from '../utils/globalTypes'
import { checkUserRights } from '../utils/checkUserRights'

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

      if (id) {
        await Post.updatePost({ id, ...json })
      } else {
        await Post.publishPost(json)
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
