import { useEffect, useMemo, useState } from 'react'
import { getBlog } from '../service/Blog'
import { Blog, UserBlogRole } from '../utils/globalTypes'
import { useLocation, useNavigate } from 'react-router-dom'
import DomainPost from '../domain/Post'

export const useBlog = (id: number) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [blog, setBlog] = useState<Blog | null>()
  const location = useLocation()
  const navigate = useNavigate()
  const blogRole = useMemo(() => {
    return blog?.userRole || 0
  }, [blog])
  const isCreator = blogRole === UserBlogRole.Creator

  const turnOffEdit = () => {
    isCreator && setIsEditMode(false)
  }

  const turnOnEdit = () => {
    isCreator && setIsEditMode(true)
  }

  const toggleEditMode = () => {
    isCreator && setIsEditMode(!isEditMode)
  }

  const blogRequest = async () => {
    const response = await getBlog(id)

    if (!response) return navigate('/not-found')
    setBlog(response)
  }

  const handlePostDelete = async (id: number) => {
    const response = await DomainPost.removePost(id)

    response && blogRequest()
  }

  useEffect(() => {
    blogRequest()
  }, [location.key])

  return {
    blog,
    blogRole,
    isEditMode,
    turnOnEdit,
    turnOffEdit,
    toggleEditMode,
    handlePostDelete,
    isCreator
  }
}
