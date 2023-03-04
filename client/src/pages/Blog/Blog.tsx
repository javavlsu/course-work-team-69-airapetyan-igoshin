import React, {useMemo, useState} from 'react';
import {Post} from "../../components/Post";
import {Post as PostType} from "../../utils/globalTypes";
import {
  AsideToggleButton,
  AvatarBlock,
  BlogAvatar, BlogContentWrapper,
  BlogDescription,
  BlogName, BlogPostsColumn, BlogPostsContainer, BlogPostsWrapper,
  BlogPreview,
  BlogWrapper, ConfigBlock, ConfigBlockHeader, ConfigBlockLabel, ConfigBlockRow, ConfigContainer,
  PreviewContainer, StatisticsBlock, StatisticsCount, StatisticsItem, ToolsItem, ToolsPanel
} from './Blog.styled';
import {observer} from "mobx-react-lite";
import designStore from "../../store/designStore";
import blogStore from "../../store/blogStore";
import EditIcon from '@mui/icons-material/Edit';
import {AsideMenu} from "../../components/AsideMenu";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import {Box} from "@mui/material";
import {ConfigSmartValue} from "./components/ConfigSmartValue";
import { ConfigNode } from './components/ConfigNode';

function parseToChunks<T>(arr: T[], columns: number): T[][] {
  const output: T[][] = []

  arr.forEach((el, index) => {
    if (output[index % columns]) {
      output[index % columns].push(el)
    } else {
      output[index % columns] = []
      output[index % columns].push(el)
    }
  })

  return output
}

const BlogComponent = () => {
  const posts: PostType[] = [
      {
        id: 1,
        header: 'Заголовок',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint quia officia a expedita officiis. Labore quis modi at iure beatae pariatur sapiente est accusantium unde tempore debitis necessitatibus, ipsam voluptate delectus! Modi suscipit quas vitae laborum deserunt magni consectetur rem consequatur possimus, cupiditate veritatis, qui obcaecati ea officiis, quo illo laboriosam amet quasi repudiandae tenetur asperiores aut mollitia! Dolorem molestias minima perspiciatis, expedita exercitationem ea quam, iure numquam est magnam accusamus amet consectetur quibusdam laborum non in iste nemo laboriosam incidunt? Consequuntur totam velit nemo facilis nulla quisquam quibusdam, aut soluta quia maiores optio sed officia! Maiores accusamus aut adipisci.',
        picture: '',
        rating: 145,
        views: 1500
      },
      {
        id: 2,
        header: 'Заголовок',
        description: 'Description...',
        picture: '',
        rating: 145,
        views: 1500
      },
      {
        id: 3,
        header: 'Заголовок',
        description: 'accusamus aut adipisci.',
        picture: '',
        rating: 145,
        views: 1500
      },
      {
        id: 4,
        header: 'Заголовок',
        description: 'Description...',
        picture: '',
        rating: 145,
        views: 1500
      }
  ]
  const [isAsideOpen, setIsAsideOpen] = useState(false)

  const chunkedPosts = useMemo(() => {
    return parseToChunks(posts, designStore.config.blogPostsOptions.columns)
  }, [posts])

  const turnEditMode = () => {
    blogStore.isEditMode = !blogStore.isEditMode
  }

  const toggleAsideMenu = () => {
    setIsAsideOpen(!isAsideOpen)
  }

  return (
    <BlogWrapper>
      <BlogPreview {...designStore.config.previewOptions}>
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
      </BlogPreview>

      <BlogContentWrapper isEditMode={ blogStore.isEditMode }>
        {
          blogStore.isEditMode && (
            <AsideMenu isOpen={ isAsideOpen }>
              <Box sx={{display: 'flex', width: '100%', justifyContent: 'end', cursor: 'pointer'}}>
                <AsideToggleButton onClick={ toggleAsideMenu }>
                  { isAsideOpen ? <ArrowCircleLeftIcon /> : <ArrowCircleRightIcon /> }
                </AsideToggleButton>
              </Box>
              {
                isAsideOpen && (
                  <ConfigContainer>
                    {
                      Object.entries(designStore.config).map(([objKey, objValue]) => (
                        <ConfigNode key={objKey} objKey={objKey} objValue={objValue} />
                      ))
                    }
                  </ConfigContainer>
                )
              }
            </AsideMenu>
          )
        }
        <BlogPostsWrapper isAsideOpen={ blogStore.isEditMode && isAsideOpen }>
          <BlogPostsContainer {...designStore.config.blogPostsOptions}>
            {
              chunkedPosts.map((_, index) => (
                <BlogPostsColumn key={index}>
                  {
                    chunkedPosts[index].map((post) => (
                      <Post post={post} key={post.id} />
                    ))
                  }
                </BlogPostsColumn>
              ))
            }
          </BlogPostsContainer>
        </BlogPostsWrapper>
      </BlogContentWrapper>
    </BlogWrapper>
  );
};

export const Blog = observer(BlogComponent)