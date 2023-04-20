import React, { useMemo, useState } from 'react'
import {
  BlogContentWrapper,
  BlogPostsContainer,
  BlogPostsWrapper,
  BlogWrapper
} from './Blog.styled'
import { observer } from 'mobx-react-lite'
import designStore from '../../store/designStore'
import blogStore from '../../store/blogStore'
import { BlogPreview } from './components/BlogPreview'
import { BlogAside } from './components/BlogAside'
import { stubPosts } from '../../stubs'
import { BlogPostsColumn } from './components/BlogPostsColumn'

function parseToChunks<T>(arr: T[], columns: number): T[][] {
  const output: T[][] = []

  arr.forEach((el, index) => {
    if (output[index % columns]) {
      output[index % columns].push(el)
    } else {
      output[index % columns] = []
      output[index % columns].push(el)
    }
  })

  return output
}

const BlogComponent = () => {
  const chunkedPosts = useMemo(() => {
    return parseToChunks(stubPosts, designStore.config.blogPostsOptions.columns)
  }, [stubPosts, designStore.config.blogPostsOptions.columns])
  const [isAsideOpen, setIsAsideOpen] = useState(false)

  const toggleAsideMenu = () => {
    setIsAsideOpen(!isAsideOpen)
  }

  return (
    <BlogWrapper>
      <BlogPreview />
      <BlogContentWrapper isEditMode={blogStore.isEditMode}>
        {blogStore.isEditMode && (
          <BlogAside isOpen={isAsideOpen} toggle={toggleAsideMenu} />
        )}
        <BlogPostsWrapper isAsideOpen={blogStore.isEditMode && isAsideOpen}>
          <BlogPostsContainer {...designStore.config.blogPostsOptions}>
            {chunkedPosts.map((_, index) => (
              <BlogPostsColumn key={index} posts={chunkedPosts[index]} />
            ))}
          </BlogPostsContainer>
        </BlogPostsWrapper>
      </BlogContentWrapper>
    </BlogWrapper>
  )
}

export const Blog = observer(BlogComponent)
