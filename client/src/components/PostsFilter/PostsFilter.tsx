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
  background: ${({ theme }) => theme.appComponents.searchBar.background};
  color: ${({ theme }) => theme.appComponents.searchBar.color};
  box-shadow: ${({ theme }) => theme.boxShadow.lightBlue};
  border: none;
  border-radius: 10px;
  outline: none;
  &::placeholder {
    color: rgba(0, 0, 0, 0.8);
  }
  &:focus {
    box-shadow: none;
  }
`

export const PostsFilter = () => {
  return (
    <PostsFilterWrapper>
      <PostsFilterInput placeholder="Поиск..." />
    </PostsFilterWrapper>
  )
}
