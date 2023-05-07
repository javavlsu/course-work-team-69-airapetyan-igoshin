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
      <PostPicture isAsideOpen={isAsideOpen} />
      <PostFooter>
        <PostFooterItem>
          Рейтинг: <PostStatistics color="green">{post.rating}</PostStatistics>
        </PostFooterItem>
        <PostFooterItem>
          Просмотров: <PostStatistics color="black">{0}</PostStatistics>
        </PostFooterItem>
      </PostFooter>
    </PostWrapper>
  )
}
