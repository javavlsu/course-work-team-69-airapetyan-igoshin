import { Delete } from '@mui/icons-material'
import { IPreviewPost } from '../../utils/globalTypes'
import {
  PostWrapper,
  PostPicture,
  PostStatistics,
  PostFooter,
  PostFooterItem,
  PostHeader,
  PostDescription,
  DeleteButton
} from './Post.styles'
import { FC, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material'
import { PostPreviews } from '../../stubs'
import dayjs from 'dayjs'

interface PostProps {
  post: IPreviewPost
  deletable?: boolean
  handleDelete?: (id: number) => void
}

const getFormattedPostDate = (date: Date) => {
  return dayjs(date).format('LL')
}

export const Post: FC<PostProps> = ({
  post,
  deletable,
  handleDelete: onDelete
}) => {
  const navigate = useNavigate()
  const theme = useTheme()

  const navigateToPost = () => {
    navigate(`/post/${post.id}`)
  }

  const handleDelete = (event: MouseEvent, postId: number) => {
    event.stopPropagation()
    onDelete && onDelete(postId)
  }

  return (
    <PostWrapper onClick={navigateToPost}>
      {deletable && (
        <DeleteButton onClick={(e) => handleDelete && handleDelete(e, post.id)}>
          <Delete />
        </DeleteButton>
      )}
      <PostHeader>{post.title}</PostHeader>
      <PostDescription>{post.description}</PostDescription>
      <PostPicture src={PostPreviews[post.id]} />
      <PostFooter>
        <PostFooterItem>
          Рейтинг:{' '}
          <PostStatistics color={theme.palette.success.main}>
            {post.rating}
          </PostStatistics>
        </PostFooterItem>
        <PostFooterItem>
          Просмотров:{' '}
          <PostStatistics color={theme.palette.text.primary}>
            {0}
          </PostStatistics>
        </PostFooterItem>
        <PostFooterItem>{getFormattedPostDate(post.createDate)}</PostFooterItem>
      </PostFooter>
    </PostWrapper>
  )
}
