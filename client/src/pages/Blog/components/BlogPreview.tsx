import { FC } from 'react'
import designStore from '../../../store/designStore'
import {
  AvatarBlock,
  BlogAvatar,
  BlogDescription,
  BlogName,
  BlogPreviewWrapper,
  PreviewContainer,
  StatisticsBlock,
  StatisticsCount,
  StatisticsItem
} from '../Blog.styled'
import EditIcon from '@mui/icons-material/Edit'
import { observer } from 'mobx-react-lite'
import { BlogPreviewProps } from '../Blog.types'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { Box, Button, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { UserBlogRole } from '../../../utils/globalTypes'
import { ToolsItem, ToolsPanel } from '../../../components/ToolsPanel'
import { Delete } from '@mui/icons-material'
import { removeBlog } from '../../../service/Blog/Blog.api'
import { UNSUBSCRIBED_USER_ROLE } from '../../../utils/constants'

const BlogPreviewComponent: FC<BlogPreviewProps> = ({
  blogRole,
  toggleEditMode,
  blog,
  isEditMode,
  register
}) => {
  const { name, subscribers, rating, posts, description } = blog
  const navigate = useNavigate()

  const subscribe = () => {
    // Todo
    console.log('Subscribe')
  }

  const unsubscribe = () => {
    // Todo
    console.log('Unsubscribe')
  }
  const toolsItems: ToolsItem[] = [
    {
      condition: blogRole >= UserBlogRole.Collaborator,
      content: (
        <Button variant={'contained'}>
          <ControlPointIcon /> Создать пост
        </Button>
      ),
      handler: () =>
        navigate({
          pathname: '/post-edit',
          search: `?blogId=${blog.id}`
        }),
      animated: false
    },
    {
      condition: blogRole >= UserBlogRole.Creator,
      content: (
        <IconButton>
          <EditIcon />
        </IconButton>
      ),
      handler: toggleEditMode,
      animated: true
    },
    {
      condition: blogRole >= UserBlogRole.Creator,
      content: (
        <IconButton>
          <Delete />
        </IconButton>
      ),
      handler: () => removeBlog(blog.id).then(() => navigate('/profile')),
      animated: true
    },
    {
      condition: blogRole === UNSUBSCRIBED_USER_ROLE,
      content: (
        <Button variant={'contained'} color={'error'}>
          Подписаться
        </Button>
      ),
      handler: () => subscribe(),
      animated: false
    },
    {
      condition: blogRole === UserBlogRole.Subscriber,
      content: (
        <Button variant={'contained'} color={'neutral'}>
          Отписаться
        </Button>
      ),
      handler: () => unsubscribe(),
      animated: false
    }
  ]

  return (
    <BlogPreviewWrapper {...designStore.config.previewOptions}>
      <Box sx={{ marginRight: '20px' }}>
        <ToolsPanel items={toolsItems} />
      </Box>

      <PreviewContainer {...designStore.config.previewContainerOptions}>
        <AvatarBlock {...designStore.config.avatarBlockOptions}>
          <BlogAvatar {...designStore.config.blogAvatarOptions} />
        </AvatarBlock>
        <BlogName
          variant={'standard'}
          placeholder={'Введите имя блога'}
          value={name}
          editable={isEditMode}
          {...designStore.config.blogNameOptions}
          inputProps={{ ...register('name') }}
        />
        <BlogDescription
          variant={'standard'}
          placeholder={'Введите описание блога'}
          value={description}
          editable={isEditMode}
          inputProps={{ ...register('description') }}
          {...designStore.config.blogDescriptionOptions}
        />
        <StatisticsBlock {...designStore.config.statisticsBlockOptions}>
          <StatisticsItem {...designStore.config.statisticsItemOptions}>
            <StatisticsCount
              {...designStore.config.statisticsCountsOptions.subscribers}
            >
              {subscribers}
            </StatisticsCount>
            Подписчиков
          </StatisticsItem>
          <StatisticsItem {...designStore.config.statisticsItemOptions}>
            <StatisticsCount
              {...designStore.config.statisticsCountsOptions.rating}
            >
              {rating}
            </StatisticsCount>
            Рейтинг
          </StatisticsItem>
          <StatisticsItem {...designStore.config.statisticsItemOptions}>
            <StatisticsCount
              {...designStore.config.statisticsCountsOptions.posts}
            >
              {posts?.length || 0}
            </StatisticsCount>
            Постов
          </StatisticsItem>
        </StatisticsBlock>
      </PreviewContainer>
    </BlogPreviewWrapper>
  )
}

export const BlogPreview = observer(BlogPreviewComponent)
