import { getPost, publishPost, removePost, updatePost } from '../service/Post'
import { PublishPost, UpdatedPost } from '../service/Post/Post.types'

class Post {
  getPost(id: number) {
    return getPost(id)
  }
  publishPost(json: PublishPost) {
    return publishPost(json)
  }
  removePost(id: number) {
    return removePost(id)
  }
  updatePost(json: UpdatedPost) {
    return updatePost(json)
  }
}

export default new Post()
