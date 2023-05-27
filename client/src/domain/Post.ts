import {
  addReact,
  getFeed,
  getPost,
  publishPost,
  removePost,
  updatePost
} from '../service/Post'
import {
  FeedData,
  PublishPost,
  ReactionBody,
  UpdatedPost
} from '../service/Post/Post.types'
import { searchPosts } from '../service/Search/Search.api'

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
  async addReact(json: ReactionBody) {
    return await addReact(json)
  }
  async search(searchText: string) {
    return await searchPosts(searchText)
  }
  async getFeed(feedData: FeedData) {
    return await getFeed(feedData)
  }
}

export default new Post()
