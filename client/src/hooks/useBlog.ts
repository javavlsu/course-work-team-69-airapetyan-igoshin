import { useEffect, useMemo, useState } from 'react'
import { getBlog } from '../service/Blog'
import { Blog, UserBlogRole } from '../utils/globalTypes'
import { useNavigate } from 'react-router-dom'

export const useBlog = (id: number) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [blog, setBlog] = useState<Blog | null>()
  const navigate = useNavigate()
  const blogRole = useMemo(() => {
    return blog?.userRole
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

    if (!response) return navigate('/blog-not-found')
    setBlog(response)
  }

  useEffect(() => {
    blogRequest()
  }, [])

  return {
    blog,
    blogRole,
    isEditMode,
    turnOnEdit,
    turnOffEdit,
    toggleEditMode,
    isCreator
  }
}
