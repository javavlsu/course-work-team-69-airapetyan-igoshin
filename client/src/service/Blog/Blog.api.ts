import ky from 'ky'
import {
  BlogCreateData,
  BlogUpdateData,
  InBlog,
  ManageCollaboratorData,
  SubscribeBody
} from './Blog.types'
import { Blog, Subscriber } from '../../utils/globalTypes'

const PREFIX_API = '/api'

export const getBlog = async (id: number) => {
  try {
    const response = await ky.get(`${PREFIX_API}/blog/${id}`)

    if (!response.ok) return null
    const blog: Blog = await response.json<InBlog>().then((blog) => {
      const config = blog.config && JSON.parse(blog.config)

      return { ...blog, config }
    })

    return blog
  } catch (e) {
    return null
  }
}

export const createBlog = async (json: BlogCreateData) => {
  const response: { blogId: number } = await ky
    .post(`${PREFIX_API}/blog`, { json })
    .json()

  return response
}

export const removeBlog = async (id: number) => {
  try {
    const response = await ky.delete(`${PREFIX_API}/blog/${id}`)

    return response.ok
  } catch (e) {
    throw new Error()
  }
}

export const updateBlog = async (json: BlogUpdateData) => {
  try {
    const response = await ky.put(`${PREFIX_API}/blog`, { json })

    return response.ok
  } catch (e) {
    return false
  }
}

export const getSubscribers = async (blogId: number) => {
  try {
    return await ky
      .get(`${PREFIX_API}/subscribers/${blogId}`)
      .json<Subscriber[]>()
  } catch (e) {
    return []
  }
}

export const subscribe = async (json: SubscribeBody) => {
  try {
    return (await ky.post(`${PREFIX_API}/subscribe`, { json })).ok
  } catch (e) {
    return false
  }
}

export const manageCollaborator = async (json: ManageCollaboratorData) => {
  try {
    return (await ky.post(`${PREFIX_API}/createCollaborator`, { json })).ok
  } catch (e) {
    return false
  }
}
