import React, { FC } from 'react'
import { BlogPostsColumn } from './BlogPostsColumn'
import { IPreviewPost } from '../../../utils/globalTypes'

export const BlogPosts: FC<{
  chunkedPosts: IPreviewPost[][]
  deletable: boolean
  handleDelete: (id: number) => void
}> = ({ chunkedPosts, deletable, handleDelete }) => (
  <>
    {chunkedPosts.length ? (
      <>
        {chunkedPosts.map((_, index) => (
          <BlogPostsColumn
            deletable={deletable}
            handleDelete={handleDelete}
            key={index}
            posts={chunkedPosts[index]}
          />
        ))}
      </>
    ) : (
      <h3 style={{ textAlign: 'center' }}>
        Не пора ли тут что-то написать? :)
      </h3>
    )}
  </>
)
