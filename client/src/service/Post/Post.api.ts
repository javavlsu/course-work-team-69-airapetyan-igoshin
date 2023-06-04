import ky from 'ky'
import { FeedData, PublishPost, ReactionBody, UpdatedPost } from './Post.types'
import { IPost, IPreviewPost } from '../../utils/globalTypes'

const PREFIX_API = '/api'

export const publishPost = async (json: PublishPost) => {
  try {
    const response: { postId: number } = await ky
      .post(`${PREFIX_API}/post`, { json })
      .json()

    return response
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
    return await ky.get(`${PREFIX_API}/post/${id}`).json<IPost>()
  } catch (e) {
    return null
  }
}

export const addReact = async (json: ReactionBody) => {
  try {
    const response = await ky.post(`${PREFIX_API}/reaction`, { json })

    return response.ok
  } catch (e) {
    throw new Error()
  }
}

const objectToSearchParams = <T extends { [k: string]: any }>(obj: T) => {
  const output = []
  let key: keyof typeof obj

  for (key in obj) {
    if (Object.hasOwn(obj, key)) {
      output.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    }
  }

  return output.join('&')
}

export const getFeed = async (feedData: FeedData) => {
  const params = objectToSearchParams(feedData)

  try {
    return await ky.get(`${PREFIX_API}/posts?${params}`).json<IPreviewPost[]>()
  } catch (e) {
    return []
  }
}
