import ky from 'ky'
import { IPreviewPost } from '../../utils/globalTypes'

const PREFIX_API = '/api'

export const searchPosts = async (searchText: string) => {
  try {
    return await ky
      .get(`${PREFIX_API}/search?query=${searchText}`)
      .json<IPreviewPost[]>()
  } catch (e) {
    return []
  }
}
