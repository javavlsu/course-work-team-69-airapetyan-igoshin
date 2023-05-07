import React from 'react'import { observer } from 'mobx-react-lite'import {  CommentsWrapper,  IconAdd,  IconRemove,  PostContent,  PostFooter,  PostPageWrapper,  PostPath,  PostPathTitle,  PostPicture,  PostRating,  PostRatingCount,  PostTitle,  RatingButton} from './PostPage.styles'import ArrowRightIcon from '@mui/icons-material/ArrowRight'import { PostComments } from '../../components/PostComments'import { Box } from '@mui/material'import LoaderPage from '../../hocks/LoaderPage'import { ToolsPanel } from '../../components/ToolsPanel'import { usePostPage } from '../../hooks/usePostPage'const PostPageComponent = () => {  const { toolsItems, post, isLoaded } = usePostPage()  return (    <LoaderPage loadingData={post} isLoaded={isLoaded}>      <Box        sx={{          height: '100%',          overflowY: 'auto'        }}      >        <PostPageWrapper>          <ToolsPanel items={toolsItems} />          <PostTitle>{post?.title}</PostTitle>          <PostContent            dangerouslySetInnerHTML={{ __html: post?.content || '' }}          />          <PostFooter>            <PostPicture />            <PostPath>              <PostPathTitle>Название блога</PostPathTitle>              <ArrowRightIcon />              <PostPathTitle>{post?.title}</PostPathTitle>            </PostPath>            <PostRating>              <RatingButton>                <IconRemove />              </RatingButton>              <PostRatingCount>567</PostRatingCount>              <RatingButton>                <IconAdd />              </RatingButton>            </PostRating>          </PostFooter>          <CommentsWrapper>            <PostComments />          </CommentsWrapper>        </PostPageWrapper>      </Box>    </LoaderPage>  )}export const PostPage = observer(PostPageComponent)