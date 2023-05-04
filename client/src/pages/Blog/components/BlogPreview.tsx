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

const BlogPreviewComponent: FC<BlogPreviewProps> = ({
  isCreator,
  toggleEditMode,
  blog
}) => {
  const { name, subscribers, rating, posts, description } = blog

  return (
    <BlogPreviewWrapper {...designStore.config.previewOptions}>
      {isCreator && (
        <ToolsPanel>
          <ToolsItem onClick={toggleEditMode}>
            <EditIcon
              sx={{
                height: '100%'
              }}
            />
          </ToolsItem>
        </ToolsPanel>
      )}
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
