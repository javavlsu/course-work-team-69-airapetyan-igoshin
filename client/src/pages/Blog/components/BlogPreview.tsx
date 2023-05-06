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
  StatisticsItem,
  ToolsItem,
  ToolsPanel
} from '../Blog.styled'
import EditIcon from '@mui/icons-material/Edit'
import { observer } from 'mobx-react-lite'
import { BlogPreviewProps } from '../Blog.types'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { UserBlogRole } from '../../../utils/globalTypes'

const BlogPreviewComponent: FC<BlogPreviewProps> = ({
  blogRole,
  toggleEditMode,
  blog
}) => {
  const { name, subscribers, rating, posts, description } = blog
  const navigate = useNavigate()
  const toolsItems = [
    {
      permissionLevel: UserBlogRole.Collaborator,
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
      permissionLevel: UserBlogRole.Creator,
      content: <EditIcon sx={{ height: '100%' }} />,
      handler: toggleEditMode,
      animated: true
    }
  ]

  return (
    <BlogPreviewWrapper {...designStore.config.previewOptions}>
      <ToolsPanel>
        {toolsItems.map(
          (tool, index) =>
            blogRole >= tool.permissionLevel && (
              <ToolsItem
                $animated={tool.animated}
                key={index}
                onClick={tool.handler}
              >
                {tool.content}
              </ToolsItem>
            )
        )}
      </ToolsPanel>

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
