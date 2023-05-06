import ky from 'ky'
import { PublishPost, UpdatedPost } from './Post.types'

const PREFIX_API = '/api'

export const publishPost = async (json: PublishPost) => {
  try {
    const response = await ky.post(`${PREFIX_API}/post`, { json })

    return response.ok
  } catch (e) {
    return false
  }
}

export const updatePost = async (json: UpdatedPost) => {
  try {
    const response = await ky.put(`${PREFIX_API}/post`, { json })

    return response.ok
  } catch (e) {
    return false
  }
}

export const removePost = async (id: number) => {
  try {
    const response = await ky.delete(`${PREFIX_API}/post/${id}`)

    return response.ok
  } catch (e) {
    return false
  }
}

export const getPost = async (id: number) => {
  try {
    return await ky.get(`${PREFIX_API}/post/${id}`).json()
  } catch (e) {
    return null
  }
}
