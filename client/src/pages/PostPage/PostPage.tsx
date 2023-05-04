import React from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { PostComments } from '../../components/PostComments'
import { Box } from '@mui/material'
import {
  PostPageWrapper,
  CommentsWrapper,
  PostContent,
  PostFooter,
  PostPath,
  PostPathTitle,
  PostTitle,
  PostRating,
  PostRatingCount,
  RatingButton,
  PostPicture,
  IconAdd,
  IconRemove
} from './PostPage.styles'
import editorStore from '../../store/editorStore'
import { observer } from 'mobx-react-lite'

const PostPageComponent = () => {
  return (
    <Box
      sx={{
        height: '100%',
        overflowY: 'auto'
      }}
    >
      <PostPageWrapper>
        <PostTitle>Заголовок поста</PostTitle>
        <PostContent
          dangerouslySetInnerHTML={{ __html: editorStore.lastPost }}
        />
        <PostFooter>
          <PostPicture />
          <PostPath>
            <PostPathTitle>Название блога</PostPathTitle>
            <ArrowRightIcon />
            <PostPathTitle>Название поста</PostPathTitle>
          </PostPath>
          <PostRating>
            <RatingButton>
              <IconRemove />
            </RatingButton>
            <PostRatingCount>567</PostRatingCount>
            <RatingButton>
              <IconAdd />
            </RatingButton>
          </PostRating>
        </PostFooter>
        <CommentsWrapper>
          <PostComments />
        </CommentsWrapper>
      </PostPageWrapper>
    </Box>
  )
}

export const PostPage = observer(PostPageComponent)
