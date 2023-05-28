import React, { ChangeEvent, FC } from 'react'
import { styled } from '@mui/material'

const PostsFilterWrapper = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
`
const PostsFilterInput = styled('input')`
  width: 80%;
  padding: 10px 15px;
  background: ${({ theme }) => theme.palette.app.main};
  color: ${({ theme }) => theme.palette.app.contrastText};
  box-shadow: ${({ theme }) => theme.shadows[1]};
  border: none;
  border-radius: 10px;
  outline: none;
  &::placeholder {
    /* color: rgba(0, 0, 0, 0.8); */
  }
  &:focus {
    box-shadow: none;
  }
`

export const PostsFilter: FC<{
  value: string
  handleValue: (e: ChangeEvent<HTMLInputElement>) => void
}> = ({ value, handleValue }) => {
  return (
    <PostsFilterWrapper>
      <PostsFilterInput
        value={value}
        onChange={handleValue}
        placeholder="Поиск..."
      />
    </PostsFilterWrapper>
  )
}
