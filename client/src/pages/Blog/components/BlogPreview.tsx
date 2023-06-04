import { FC, useState } from 'react'
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
  StatisticsItem,
  StatisticsItemButton
} from '../Blog.styled'
import EditIcon from '@mui/icons-material/Edit'
import { observer } from 'mobx-react-lite'
import { BlogPreviewProps } from '../Blog.types'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { Box, Button, IconButton } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import { Subscriber, UserBlogRole } from '../../../utils/globalTypes'
import { ToolsItem, ToolsPanel } from '../../../components/ToolsPanel'
import { Delete } from '@mui/icons-material'
import { removeBlog, subscribe } from '../../../service/Blog/Blog.api'
import { UNSUBSCRIBED_USER_ROLE } from '../../../utils/constants'
import { Subscribers } from './Subscribers'
import { getSubscribers } from '../../../service'
import { blogLogos, blogPreviewImages } from '../../../stubs'
import userStore from '../../../store/userStore'
import alertStore from '../../../store/alertStore'

const BlogPreviewComponent: FC<BlogPreviewProps> = ({
  blogRole: initialRole,
  toggleEditMode,
  blog,
  isEditMode,
  register
}) => {
  const { name, subscribers, rating, posts, description } = blog
  const navigate = useNavigate()
  const [isSubscribersOpen, setIsSubscribersOpen] = useState(false)
  const [fullSubscribers, setFullSubscribers] = useState<Subscriber[]>([])
  const [blogRole, setBlogRole] = useState(initialRole)
  const handleSubscribersClose = () => setIsSubscribersOpen(false)

  const handleSubscribersClick = async () => {
    setIsSubscribersOpen(true)
    const data = await getSubscribers(blog.id)

    setFullSubscribers(data)
  }

  const handleSubscribe = async (subscribeFlag = true) => {
    if (!userStore.isAuth)
      return alertStore.create({
        type: 'info',
        children: (
          <>
            Для начала необходимо <Link to={'/login'}>авторизоваться</Link>
          </>
        )
      })
    const response = await subscribe({
      blogId: blog.id,
      subscribe: subscribeFlag
    })

    if (!response) return
    subscribeFlag ? setBlogRole(UserBlogRole.Subscriber) : setBlogRole(-1)
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
      handler: () => handleSubscribe(),
      animated: false
    },
    {
      condition: blogRole === UserBlogRole.Subscriber,
      content: (
        <Button variant={'contained'} color={'neutral'}>
          Отписаться
        </Button>
      ),
      handler: () => handleSubscribe(false),
      animated: false
    }
  ]

  return (
    <BlogPreviewWrapper
      $image={blogPreviewImages[blog.id]}
      {...designStore.config.previewOptions}
    >
      <Subscribers
        subscribers={fullSubscribers}
        open={isSubscribersOpen}
        onClose={handleSubscribersClose}
        blogId={blog.id}
      />
      <Box sx={{ marginRight: '20px' }}>
        <ToolsPanel items={toolsItems} />
      </Box>

      <PreviewContainer {...designStore.config.previewContainerOptions}>
        <AvatarBlock {...designStore.config.avatarBlockOptions}>
          <BlogAvatar
            src={blogLogos[blog.id]}
            {...designStore.config.blogAvatarOptions}
          />
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
          <StatisticsItemButton
            onClick={handleSubscribersClick}
            {...designStore.config.statisticsItemOptions}
          >
            <StatisticsCount
              {...designStore.config.statisticsCountsOptions.subscribers}
            >
              {subscribers}
            </StatisticsCount>
            Подписчиков
          </StatisticsItemButton>
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
