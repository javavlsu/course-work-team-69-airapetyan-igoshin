import React, {FC} from 'react';
import {Post} from "../../../components/Post";
import {PostsColumn} from "../Blog.styled";
import {IPost} from "../../../utils/globalTypes";

export const BlogPostsColumn:FC<{ posts: IPost[] }> = ({ posts }) => {
  return (
    <PostsColumn>
      {posts.map((post) => (
        <Post post={post} key={post.id}/>
      ))
      }
    </PostsColumn>
  );
};