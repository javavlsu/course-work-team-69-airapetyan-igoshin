import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getBlog } from '../service/Blog'
import { Blog, UserBlogRole } from '../utils/globalTypes'
import { useLocation, useNavigate } from 'react-router-dom'
import DomainPost from '../domain/Post'
import designStore, { defaultDesignConfig } from '../store/designStore'
import { UNSUBSCRIBED_USER_ROLE } from '../utils/constants'

export const useBlog = (id: number) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [blog, setBlog] = useState<Blog | null>()
  const location = useLocation()
  const navigate = useNavigate()
  const blogRole = useMemo(() => {
    console.log(blog?.userRole)
    return typeof blog?.userRole === 'number'
      ? blog?.userRole
      : UNSUBSCRIBED_USER_ROLE
  }, [blog])
  const isCreator = blogRole === UserBlogRole.Creator
  const { register, setValue, getValues } = useForm()

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

    designStore.config = response.config || defaultDesignConfig
    setValue('name', response.name)
    setValue('description', response.description)
  }

  const handlePostDelete = async (id: number) => {
    const response = await DomainPost.removePost(id)

    response && blogRequest()
  }

  const updateBlogOnFE = (name: string, description: string) => {
    turnOffEdit()
    setBlog((prevState) => {
      return {
        ...prevState,
        description,
        name,
        config: designStore.config
      } as Blog
    })
  }

  useEffect(() => {
    blogRequest()
  }, [location.key])

  useEffect(() => {
    if (!isEditMode) return

    setValue('name', blog?.name)
    setValue('description', blog?.description)
  }, [isEditMode])

  return {
    blog,
    blogRole,
    isEditMode,
    turnOnEdit,
    turnOffEdit,
    toggleEditMode,
    handlePostDelete,
    isCreator,
    register,
    getValues,
    updateBlogOnFE
  }
}
