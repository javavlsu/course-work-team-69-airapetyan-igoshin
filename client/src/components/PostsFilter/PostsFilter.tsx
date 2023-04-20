import React from 'react'
import { styled } from '@mui/material'

const PostsFilterWrapper = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
`
const PostsFilterInput = styled('input')`
  width: 80%;
  padding: 10px 15px;
  background: #d9d9d9;
  border: none;
  border-radius: 10px;
  &::placeholder {
    color: rgba(0, 0, 0, 0.8);
  }
`

export const PostsFilter = () => {
  return (
    <PostsFilterWrapper>
      <PostsFilterInput placeholder="Поиск..." />
    </PostsFilterWrapper>
  )
}
