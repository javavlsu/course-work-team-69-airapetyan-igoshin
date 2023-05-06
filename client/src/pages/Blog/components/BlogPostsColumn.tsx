import React, { FC } from 'react'
import { Post } from '../../../components/Post'
import { PostsColumn } from '../Blog.styled'
import { IPreviewPost } from '../../../utils/globalTypes'

export const BlogPostsColumn: FC<{
  posts: IPreviewPost[]
  deletable: boolean
  handleDelete: (id: number) => void
}> = ({ posts, deletable, handleDelete }) => {
  return (
    <PostsColumn>
      {posts.map((post) => (
        <Post
          handleDelete={handleDelete}
          deletable={deletable}
          post={post}
          key={post.id}
        />
      ))}
    </PostsColumn>
  )
}
