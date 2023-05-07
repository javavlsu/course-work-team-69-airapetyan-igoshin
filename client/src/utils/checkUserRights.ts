import { IPost, UserBlogRole } from './globalTypes'
import userStore from '../store/userStore'

export const checkUserRights = (post?: IPost) => {
  if (!post) return false

  const blog = userStore.blogs.find((blog) => blog.id === post?.blogId)

  if (!blog || !blog.userRole) return false
  return blog.userRole >= UserBlogRole.Collaborator
}
