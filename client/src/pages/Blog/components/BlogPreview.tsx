import React from 'react';
import designStore from "../../../store/designStore";
import blogStore from "../../../store/blogStore";
import {
  AvatarBlock,
  BlogAvatar,
  BlogDescription,
  BlogName, BlogPreviewWrapper,
  PreviewContainer, StatisticsBlock, StatisticsCount, StatisticsItem,
  ToolsItem,
  ToolsPanel
} from "../Blog.styled";
import EditIcon from "@mui/icons-material/Edit";
import {observer} from "mobx-react-lite";

const BlogPreviewComponent = () => {
  const turnEditMode = () => {
    blogStore.isEditMode = !blogStore.isEditMode
  }

  return (
    <BlogPreviewWrapper {...designStore.config.previewOptions}>
      {
        blogStore.isOwnBlog && (
          <ToolsPanel>
            <ToolsItem onClick={turnEditMode}>
              <EditIcon sx={{
                height: '100%',
              }}/>
            </ToolsItem>
          </ToolsPanel>
        )
      }
      <PreviewContainer {...designStore.config.previewContainerOptions}>
        <AvatarBlock {...designStore.config.avatarBlockOptions}>
          <BlogAvatar {...designStore.config.blogAvatarOptions} />
        </AvatarBlock>
        <BlogName {...designStore.config.blogNameOptions}>Название блога</BlogName>
        <BlogDescription {...designStore.config.blogDescriptionOptions}>Описание...</BlogDescription>
        <StatisticsBlock {...designStore.config.statisticsBlockOptions}>
          <StatisticsItem {...designStore.config.statisticsItemOptions}>
            <StatisticsCount {...designStore.config.statisticsCountsOptions.subscribers}>7456</StatisticsCount>Подписчиков
          </StatisticsItem>
          <StatisticsItem {...designStore.config.statisticsItemOptions}>
            <StatisticsCount {...designStore.config.statisticsCountsOptions.rating}>145</StatisticsCount>Рейтинг
          </StatisticsItem>
          <StatisticsItem {...designStore.config.statisticsItemOptions}>
            <StatisticsCount {...designStore.config.statisticsCountsOptions.posts}>45</StatisticsCount>Постов
          </StatisticsItem>
        </StatisticsBlock>
      </PreviewContainer>
    </BlogPreviewWrapper>
  );
};

export const BlogPreview = observer(BlogPreviewComponent)