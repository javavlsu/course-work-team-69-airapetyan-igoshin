import React from 'react';
import {Post} from "../../components/Post";
import {Post as PostType} from "../../utils/globalTypes";
import {styled} from "@mui/material";

const BlogWrapper = styled('section')`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`

interface PreviewOptions {height: number, horizontal: string, vertical: string}
const BlogPreview = styled('div')<PreviewOptions>`
  min-height: ${({ height }) => height }vh; // Если не прокатит то min-height
  width: 100%;
  display: flex;
  justify-content: ${({ horizontal }) => horizontal };
  align-items: ${({ vertical }) => vertical };
  background: #9A9A9A;
`
const previewOptions: PreviewOptions = {
  height: 50,
  horizontal: 'center',
  vertical: 'center',
}

interface PreviewContainerOptions {
  horizontal: string,
  gap: number;
}
const PreviewContainer = styled('div')<PreviewContainerOptions>`
  display: flex;
  flex-direction: column;
  align-items: ${({ horizontal }) => horizontal };
  gap: ${({ gap }) => gap }px;
`
const previewContainerOptions: PreviewContainerOptions = {
  horizontal: 'center',
  gap: 15,
}

interface AvatarBlockOptions {
  horizontal: string,
}
const AvatarBlock = styled('div')<AvatarBlockOptions>`
  width: 100%;
  display: flex;
  justify-content: ${({ horizontal }) => horizontal };
  
`
const avatarBlockOptions: AvatarBlockOptions = {
  horizontal: 'center',
}

interface BlogAvatarOptions {
  height: number,
  width: number,
  borderRadius: string,
}
const BlogAvatar = styled('img')<BlogAvatarOptions>`
  height: ${({ height }) => height }px;
  width: ${({ width }) => width }px;
  border-radius: ${({ borderRadius }) => borderRadius };
  background: #D9D9D9;
`
const blogAvatarOptions: BlogAvatarOptions = {
  height: 100,
  width: 100,
  borderRadius: '100%',
}

interface BlogNameOptions {
  fontSize: number;
  color: string;
  textTransform: string;
  textDecoration: string;
  fontStyle: string;
  margin: string;
}
const BlogName = styled('h2')<BlogNameOptions>`
  font-size: ${({ fontSize }) => fontSize }px;
  color: ${({ color }) => color };
  text-transform: ${({ textTransform }) => textTransform };
  text-decoration: ${({ textDecoration }) => textDecoration };
  font-style: ${({ fontStyle }) => fontStyle };
  margin: ${({ margin }) => margin };
`
const blogNameOptions: BlogNameOptions = {
  fontSize: 20,
  color: '#fff',
  textTransform: 'capitalize',
  textDecoration: 'none',
  fontStyle: 'none',
  margin: '0',
}

interface BlogDescriptionOptions {
  fontSize: number;
  color: string;
  textTransform: string;
  textDecoration: string;
  fontStyle: string;
  margin: string;
}
const BlogDescription = styled('h2')<BlogDescriptionOptions>`
  font-size: ${({ fontSize }) => fontSize }px;
  color: ${({ color }) => color };
  text-transform: ${({ textTransform }) => textTransform };
  text-decoration: ${({ textDecoration }) => textDecoration };
  font-style: ${({ fontStyle }) => fontStyle };
  margin: ${({ margin }) => margin };
`
const blogDescriptionOptions: BlogDescriptionOptions = {
  fontSize: 14,
  color: '#fff',
  textTransform: 'capitalize',
  textDecoration: 'none',
  fontStyle: 'none',
  margin: '0',
}

interface StatisticsBlockOptions {
  direction: string,
  horizontal: string,
  vertical: string,
  gap: number,
}
const StatisticsBlock = styled('div')<StatisticsBlockOptions>`
  display: flex;
  flex-direction: ${({ direction }) => direction };
  justify-content: ${(props) => props.direction === 'column' ? props.vertical : props.horizontal };
  align-items: ${(props) => props.direction === 'column' ? props.horizontal : props.vertical };
  gap: ${({ gap }) => gap }px;
`
const statisticsBlockOptions: StatisticsBlockOptions = {
  direction: 'row',
  horizontal: 'start',
  vertical: 'center',
  gap: 20,
}

interface StatisticsItemOptions {
  direction: string,
  horizontal: string,
  vertical: string,
  gap: number,
}
const StatisticsItem = styled('div')<StatisticsItemOptions>`
  display: flex;
  flex-direction: ${({ direction }) => direction };
  justify-content: ${(props) => props.direction === 'column' ? props.vertical : props.horizontal };
  align-items: ${(props) => props.direction === 'column' ? props.horizontal : props.vertical };
  gap: ${({ gap }) => gap }px;
  font-size: 12px;
`
const statisticsItemOptions: StatisticsItemOptions = {
  direction: 'row',
  horizontal: 'start',
  vertical: 'center',
  gap: 5,
}

interface StatisticsCountOptions {
  fontSize: number,
  color: string,
  fontWeight: number,
}
const StatisticsCount = styled('span')<StatisticsCountOptions>`
  font-size: ${({ fontSize }) => fontSize }px;
  color: ${({ color }) => color };
  font-weight: ${({ fontWeight }) => fontWeight };
`

interface StatisticsCountsOptions {
  subscribers: StatisticsCountOptions,
  rating: StatisticsCountOptions,
  posts: StatisticsCountOptions,
}

const statisticsCountsOptions: StatisticsCountsOptions = {
  subscribers: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 700,
  },
  rating: {
    fontSize: 14,
    color: '#166F00',
    fontWeight: 700,
  },
  posts: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 700,
  }
}

const BlogPostsWrapper = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-grow: 1;
`

interface BlogPostsOptions {
  width: string,
  columns: number,
}
const BlogPostsContainer = styled('div')<BlogPostsOptions>`
  width: ${({ width }) => width };
  display: grid;
  grid-template: 1fr / repeat(${({ columns }) => columns}, 1fr);
  column-gap: 40px;
  row-gap: 40px;
  margin: 50px 0;
`
const blogPostsOptions: BlogPostsOptions = {
  columns: 2,
  width: '80%',
}

export const Blog = () => {
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
      description: 'Description...',
      picture: '',
      rating: 145,
      views: 1500
    },
  ]
  return (
    <BlogWrapper>
      <BlogPreview {...previewOptions}>
        <PreviewContainer {...previewContainerOptions}>
          <AvatarBlock {...avatarBlockOptions}>
            <BlogAvatar {...blogAvatarOptions} />
          </AvatarBlock>
          <BlogName {...blogNameOptions}>Название блога</BlogName>
          <BlogDescription {...blogDescriptionOptions}>Описание...</BlogDescription>
          <StatisticsBlock {...statisticsBlockOptions}>
            <StatisticsItem {...statisticsItemOptions}>
              <StatisticsCount {...statisticsCountsOptions.subscribers}>7456</StatisticsCount>Подписчиков
            </StatisticsItem>
            <StatisticsItem {...statisticsItemOptions}>
              <StatisticsCount {...statisticsCountsOptions.rating}>145</StatisticsCount>Рейтинг
            </StatisticsItem>
            <StatisticsItem {...statisticsItemOptions}>
              <StatisticsCount {...statisticsCountsOptions.posts}>45</StatisticsCount>Постов
            </StatisticsItem>
          </StatisticsBlock>
        </PreviewContainer>
      </BlogPreview>

      <BlogPostsWrapper>
        <BlogPostsContainer {...blogPostsOptions}>
          {
            posts.map((post) => (
              <Post post={post} />
            ))
          }
        </BlogPostsContainer>
      </BlogPostsWrapper>
    </BlogWrapper>
  );
};