import { Link } from 'react-router-dom'
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
import { blogPreviewImages } from '../../stubs'

const PostPageComponent = () => {
  const { toolsItems, post, isLoaded, handleRating } = usePostPage()
  const postComments = post ? stubComments.comments[post.id] : []
  // todo
  const isDownvoteDisabled = false
  const isUpvoteDisabled = false

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
            <PostPicture src={blogPreviewImages[post?.blogId as number]} />
            <PostPath>
              <Breadcrumbs
                separator={<NavigateNext fontSize="small" />}
                aria-label="breadcrumb"
              >
                <Link color="inherit" to={`/blog/${post?.blogId}`}>
                  {post?.blogName}
                </Link>
                <Typography color="text.primary">{post?.title}</Typography>
              </Breadcrumbs>
            </PostPath>
            <PostRating>
              <IconButton
                onClick={() => handleRating(Reaction.Downvote)}
                disabled={isDownvoteDisabled}
              >
                <IconRemove />
              </IconButton>
              <PostRatingCount>{post?.rating}</PostRatingCount>
              <IconButton
                onClick={() => handleRating(Reaction.Upvote)}
                disabled={isUpvoteDisabled}
              >
                <IconAdd />
              </IconButton>
            </PostRating>
          </PostFooter>
          <Divider />
          <CommentsWrapper>
            <SendComment postId={post?.id} />
            <PostComments comments={postComments} />
          </CommentsWrapper>
        </PostPageWrapper>
      </Box>
    </LoaderPage>
  )
}

export const PostPage = observer(PostPageComponent)
