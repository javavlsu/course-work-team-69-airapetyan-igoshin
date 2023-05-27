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
  blogId: number
  title: string
  description: string
  content: string
  rating: number
  isDraft: boolean
  blogName: string
}

export type IPreviewPost = Omit<
  IPost,
  'content' | 'isDraft' | 'blogId' | 'blogName'
>

export interface Blog {
  id: number
  name: string
  description: string
  userRole: UserBlogRole | null
  subscribers: number
  rating: number
  posts?: IPost[]
  config?: IDesignConfig
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

export enum Reaction {
  Upvote,
  Downvote
}

export enum FeedType {
  Popular,
  Latest
}
