import React, {FC} from 'react';
import {Blog as BlogType} from "../../utils/globalTypes";
import {styled} from "@mui/material";

interface BlogCardProps {
  blog: BlogType,
}

const BlogCardWrapper = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  gap: 15px;
  background: #D9D9D9;
  height: 100px;
  padding-right: 20px;
`

const BlogCardPicture = styled('img')`
  width: 100px;
  height: 100%;
  border-radius: 10px;
  background: #878787;
`

const BlogCardContent = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex-grow: 1;
`

const BlogTitle = styled('h3')`
  margin: 0;
  font-size: 18px;
`

const BlogDescription = styled('p')`
  margin: 0;
  padding: 0;
  font-size: 12px;
`

const StatisticsBlock = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  gap: 5px;
  font-size: 12px;
`

const StatisticsItem = styled('div')`
  display: flex;
  align-items: center;
`

const StatisticsCount = styled('span')<{color: string}>`
  color: ${({color}) => color};
  font-size: 16px;
  margin-left: 10px;
`

export const BlogCard:FC<BlogCardProps> = ({ blog }) => {
  return (
    <BlogCardWrapper>
      <BlogCardPicture />
      <BlogCardContent>
        <BlogTitle>{blog.title}</BlogTitle>
        <BlogDescription>{blog.description}</BlogDescription>
      </BlogCardContent>
      <StatisticsBlock>
        <StatisticsItem>
          Подписчиков: <StatisticsCount color="blue">{blog.subscribers}</StatisticsCount>
        </StatisticsItem>
        <StatisticsItem>
          Рейтинг: <StatisticsCount color="green">{blog.rating}</StatisticsCount>
        </StatisticsItem>
      </StatisticsBlock>
    </BlogCardWrapper>
  );
};