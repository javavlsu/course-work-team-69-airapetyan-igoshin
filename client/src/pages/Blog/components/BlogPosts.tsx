import React, { FC } from 'react'
import { BlogPostsColumn } from './BlogPostsColumn'
import { IPost } from '../../../utils/globalTypes'

export const BlogPosts: FC<{ chunkedPosts: IPost[][] }> = ({
  chunkedPosts
}) => (
  <>
    {chunkedPosts.length ? (
      <>
        {chunkedPosts.map((_, index) => (
          <BlogPostsColumn key={index} posts={chunkedPosts[index]} />
        ))}
      </>
    ) : (
      <h3 style={{ textAlign: 'center' }}>
        Не пора ли тут что-то написать? :)
      </h3>
    )}
  </>
)
