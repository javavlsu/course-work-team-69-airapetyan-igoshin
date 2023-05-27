import { Blog } from '../../utils/globalTypes'

export interface BlogCreateData {
  name: string
  description: string
}

export type BlogUpdateData = BlogCreateData & {
  id: number
  config: string
}

export type InBlog = Omit<Blog, 'config'> & { config: string }
