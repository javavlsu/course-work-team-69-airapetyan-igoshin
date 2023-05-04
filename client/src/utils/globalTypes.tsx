import {
  AvatarBlockOptions,
  BlogAvatarOptions,
  BlogDescriptionOptions,
  BlogNameOptions,
  BlogPostsOptions,
  PreviewContainerOptions,
  PreviewOptions,
  StatisticsBlockOptions,
  StatisticsCountsOptions,
  StatisticsItemOptions
} from '../pages/Blog/Blog.types'

export interface IPost {
  id: number
  title: string
  description: string
  rating: number
}

export interface Blog {
  id: number
  name: string
  description: string
  userRole: UserBlogRole | null
  subscribers: number
  rating: number
  postAmount: number
  posts?: IPost[]
}

export interface IDesignConfig {
  previewOptions: PreviewOptions
  previewContainerOptions: PreviewContainerOptions
  avatarBlockOptions: AvatarBlockOptions
  blogAvatarOptions: BlogAvatarOptions
  blogNameOptions: BlogNameOptions
  blogDescriptionOptions: BlogDescriptionOptions
  statisticsBlockOptions: StatisticsBlockOptions
  statisticsItemOptions: StatisticsItemOptions
  statisticsCountsOptions: StatisticsCountsOptions
  blogPostsOptions: BlogPostsOptions
}

export enum UserBlogRole {
  Subscriber,
  Collaborator,
  Creator
}
