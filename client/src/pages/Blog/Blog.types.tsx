import { Blog, UserBlogRole } from '../../utils/globalTypes'

export interface PreviewOptions {
  name: string
  height: number
}

export interface BlogNameOptions {
  name: string
  fontSize: number
  color: string
  textTransform: string
  textDecoration: string
  fontStyle: string
  margin: string
}

export interface BlogAvatarOptions {
  name: string
  height: number
  width: number
  borderRadius: string
}

export interface AvatarBlockOptions {
  name: string
  horizontal: string
}

export interface PreviewContainerOptions {
  name: string
  horizontal: string
  vertical: string
  gap: number
}

export interface StatisticsItemOptions {
  name: string
  direction: string
  horizontal: string
  vertical: string
  gap: number
}

export interface StatisticsBlockOptions {
  name: string
  direction: string
  horizontal: string
  vertical: string
  gap: number
}

export interface BlogDescriptionOptions {
  name: string
  fontSize: number
  color: string
  textTransform: string
  textDecoration: string
  fontStyle: string
  margin: string
}

export interface BlogPostsOptions {
  name: string
  width: string
  columns: number
}

export interface StatisticsCountsOptions {
  name: string
  isGroup: boolean
  subscribers: StatisticsCountOptions
  rating: StatisticsCountOptions
  posts: StatisticsCountOptions
}

export interface StatisticsCountOptions {
  name: string
  fontSize: number
  color: string
  fontWeight: number
}

export interface BlogPreviewProps {
  blogRole: UserBlogRole
  toggleEditMode: () => void
  blog: Blog
}
