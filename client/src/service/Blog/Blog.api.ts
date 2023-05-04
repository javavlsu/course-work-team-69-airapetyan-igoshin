import ky from 'ky'
import { Blog } from '../../utils/globalTypes'
import { BlogCreateData } from './Blog.types'

const PREFIX_API = '/api'

export const getBlog = async (id: number) => {
  try {
    const response = await ky.get(`${PREFIX_API}/blog/${id}`)

    if (!response.ok) return null
    return await response.json<Blog>()
  } catch (e) {
    return null
  }
}

export const createBlog = async (json: BlogCreateData) => {
  const response = await ky.post(`${PREFIX_API}/blog`, { json })

  return response.ok
}
