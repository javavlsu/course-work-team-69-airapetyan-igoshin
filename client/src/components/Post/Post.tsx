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
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material'
import { PostPreviews } from '../../stubs'

interface PostProps {
  post: IPreviewPost
  isAsideOpen?: boolean
  deletable?: boolean
  handleDelete?: (id: number) => void
}

export const Post: FC<PostProps> = ({
  post,
  isAsideOpen = false,
  deletable,
  handleDelete
}) => {
  const navigate = useNavigate()
  const theme = useTheme()

  const navigateToPost = () => {
    navigate(`/post/${post.id}`)
  }

  return (
    <PostWrapper onClick={navigateToPost}>
      {deletable && (
        <DeleteButton onClick={() => handleDelete && handleDelete(post.id)}>
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
      </PostFooter>
    </PostWrapper>
  )
}
