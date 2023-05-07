import { useLocation, useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useMemo, useState } from 'react'
import { IPost } from '../utils/globalTypes'
import Post from '../domain/Post'
import { ToolsItem } from '../components/ToolsPanel'
import { Button } from '@mui/material'
import { checkUserRights } from '../utils/checkUserRights'

export const usePostPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<IPost>()
  const [isLoaded, setIsLoaded] = useState(false)
  const toolsItems: ToolsItem[] = useMemo(
    () => [
      {
        condition: checkUserRights(post),
        animated: false,
        handler: () => {
          navigate({
            pathname: '/post-edit',
            search: `?blogId=${post?.blogId}&postId=${post?.id}`
          })
        },
        content: (
          <Button variant={'contained'} color={'warning'}>
            Редактировать
          </Button>
        )
      }
    ],
    [post]
  )

  const requestPost = async () => {
    const response = await Post.getPost(Number(id))

    setIsLoaded(true)
    if (!response) return
    setPost(response)
  }

  useEffect(() => {
    if (!id) return
    requestPost()
  }, [location.key])

  return {
    toolsItems,
    post,
    isLoaded
  }
}
