import React, { useMemo, useState } from 'react'
import {
  BlogContentWrapper,
  BlogPostsContainer,
  BlogPostsWrapper,
  BlogWrapper
} from './Blog.styled'
import { observer } from 'mobx-react-lite'
import designStore from '../../store/designStore'
import { BlogPreview } from './components/BlogPreview'
import { BlogAside } from './components/BlogAside'
import { parseToChunks } from './Blog.utils'
import { useBlog } from '../../hooks/useBlog'
import { useParams } from 'react-router-dom'
import { BlogPosts } from './components/BlogPosts'
import { stubPosts } from '../../stubs'

const BlogComponent = () => {
  const [isAsideOpen, setIsAsideOpen] = useState(false)
  const { id } = useParams()
  const { isEditMode, blogRole, toggleEditMode, blog } = useBlog(Number(id))
  const chunkedPosts = useMemo(() => {
    if (!blog) return []
    return parseToChunks(stubPosts, designStore.config.blogPostsOptions.columns)
  }, [blog, designStore.config.blogPostsOptions.columns])

  const toggleAsideMenu = () => {
    setIsAsideOpen(!isAsideOpen)
  }

  return (
    <BlogWrapper>
      {blog && (
        <>
          <BlogPreview
            blog={blog}
            blogRole={blogRole}
            toggleEditMode={toggleEditMode}
          />
          <BlogContentWrapper isEditMode={isEditMode}>
            {isEditMode && (
              <BlogAside isOpen={isAsideOpen} toggle={toggleAsideMenu} />
            )}
            <BlogPostsWrapper isAsideOpen={isEditMode && isAsideOpen}>
              <BlogPostsContainer {...designStore.config.blogPostsOptions}>
                <BlogPosts chunkedPosts={chunkedPosts} />
              </BlogPostsContainer>
            </BlogPostsWrapper>
          </BlogContentWrapper>
        </>
      )}
    </BlogWrapper>
  )
}

export const Blog = observer(BlogComponent)
