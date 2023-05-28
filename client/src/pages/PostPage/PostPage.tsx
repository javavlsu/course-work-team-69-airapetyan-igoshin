import React from 'react'
import { observer } from 'mobx-react-lite'
import {
  CommentsWrapper,
  IconAdd,
  IconRemove,
  PostContent,
  PostFooter,
  PostPageWrapper,
  PostPath,
  PostPicture,
  PostRating,
  PostRatingCount,
  PostTitle
} from './PostPage.styles'
import { PostComments } from '../../components/PostComments'
import {
  Box,
  Breadcrumbs,
  IconButton,
  Link,
  Typography,
  Divider
} from '@mui/material'
import LoaderPage from '../../hocks/LoaderPage'
import { ToolsPanel } from '../../components/ToolsPanel'
import { usePostPage } from '../../hooks/usePostPage'
import { NavigateNext } from '@mui/icons-material'
import { Reaction } from '../../utils/globalTypes'
import { SendComment } from './components/SendComment'
import stubComments from '../../store/stubComments'

const PostPageComponent = () => {
  const { toolsItems, post, isLoaded, handleRating } = usePostPage()

  return (
    <LoaderPage loadingData={post} isLoaded={isLoaded}>
      <Box
        sx={{
          height: '100%',
          overflowY: 'auto'
        }}
      >
        <PostPageWrapper>
          <ToolsPanel items={toolsItems} />
          <PostTitle>{post?.title}</PostTitle>
          <PostContent
            dangerouslySetInnerHTML={{ __html: post?.content || '' }}
          />
          <PostFooter>
            <PostPicture />
            <PostPath>
              <Breadcrumbs
                separator={<NavigateNext fontSize="small" />}
                aria-label="breadcrumb"
              >
                <Link
                  underline="hover"
                  color="inherit"
                  href={`/blog/${post?.blogId}`}
                >
                  {post?.blogName}
                </Link>
                <Typography color="text.primary">{post?.title}</Typography>
              </Breadcrumbs>
            </PostPath>
            <PostRating>
              <IconButton onClick={() => handleRating(Reaction.Downvote)}>
                <IconRemove />
              </IconButton>
              <PostRatingCount>{post?.rating}</PostRatingCount>
              <IconButton onClick={() => handleRating(Reaction.Upvote)}>
                <IconAdd />
              </IconButton>
            </PostRating>
          </PostFooter>
          <Divider />
          <CommentsWrapper>
            <SendComment />
            <PostComments comments={stubComments.comments} />
          </CommentsWrapper>
        </PostPageWrapper>
      </Box>
    </LoaderPage>
  )
}

export const PostPage = observer(PostPageComponent)
