import React, {FC} from 'react';
import {styled} from "@mui/material";
import {Post as PostType} from "../../utils/globalTypes";

interface PostProps {
  post: PostType,
  isAsideOpen?: boolean,
}

const PostWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  border-radius: 10px;
  background: #D9D9D9;
  width: 100%;
  word-wrap: break-word;
  overflow-x: hidden;
`

const PostHeader = styled('h6')`
  margin: 5px 0 10px 20px;
  font-weight: 500;
  font-size: 18px;
`

const PostDescription = styled('p')`
  padding: 0;
  margin: 10px 0 10px 20px;
  font-size: 14px;
`

const PostPicture = styled('img')<{isAsideOpen: boolean}>`
  margin: 10px 0;
  background: #9A9A9A;
  width: 100%;
  height: ${({isAsideOpen}) => isAsideOpen ? '260px' : '350px'};
`

const PostFooter = styled('div')`
  display: flex;
  justify-content: end;
  width: 100%;
  gap: 30px;
  padding: 0 20px 5px;
`

const PostFooterItem = styled('div')`
  display: flex;
  gap: 10px;
  font-size: 12px;
`

const PostStatistics = styled('span')<{color: string}>`
  color: ${({color}) => color};
  font-size: 14px;
`

export const Post:FC<PostProps> = ({ post , isAsideOpen=false}) => {
  return (
    <PostWrapper>
      <PostHeader>{post.header}</PostHeader>
      <PostDescription>{post.description}</PostDescription>
      <PostPicture isAsideOpen={isAsideOpen} />
      <PostFooter>
        <PostFooterItem>
          Рейтинг: <PostStatistics color="green">{post.rating}</PostStatistics>
        </PostFooterItem>
        <PostFooterItem>
          Просмотров: <PostStatistics color="black">{post.views}</PostStatistics>
        </PostFooterItem>
      </PostFooter>
    </PostWrapper>
  );
};