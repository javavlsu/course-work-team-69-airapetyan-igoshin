import React, { FC } from 'react'
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

const BlogPreviewComponent: FC<BlogPreviewProps> = ({
  blogRole,
  toggleEditMode,
  blog
}) => {
  const { name, subscribers, rating, posts, description } = blog
  const navigate = useNavigate()
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
        <BlogName {...designStore.config.blogNameOptions}>{name}</BlogName>
        <BlogDescription {...designStore.config.blogDescriptionOptions}>
          {description}
        </BlogDescription>
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
