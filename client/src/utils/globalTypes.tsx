import {
  AvatarBlockOptions,
  BlogAvatarOptions, BlogDescriptionOptions,
  BlogNameOptions, BlogPostsOptions,
  PreviewContainerOptions,
  PreviewOptions, StatisticsBlockOptions, StatisticsCountsOptions, StatisticsItemOptions
} from "../pages/Blog/Blog.types";

export interface IPost {
  id: number,
  header: string,
  description: string,
  picture: string,
  rating: number,
  views: number,
}

export interface Blog {
  id: number,
  title: string,
  description: string,
  subscribers: number,
  rating: number,
  picture: string,
}

export interface IDesignConfig {
  previewOptions: PreviewOptions,
  previewContainerOptions: PreviewContainerOptions,
  avatarBlockOptions: AvatarBlockOptions,
  blogAvatarOptions: BlogAvatarOptions,
  blogNameOptions: BlogNameOptions,
  blogDescriptionOptions: BlogDescriptionOptions,
  statisticsBlockOptions: StatisticsBlockOptions,
  statisticsItemOptions: StatisticsItemOptions,
  statisticsCountsOptions: StatisticsCountsOptions,
  blogPostsOptions: BlogPostsOptions,
}