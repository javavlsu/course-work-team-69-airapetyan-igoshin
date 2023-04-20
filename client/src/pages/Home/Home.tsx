import React from 'react'
import { styled } from '@mui/material'
import { AsideMenu } from '../../components/AsideMenu'
import { useOutletContext } from 'react-router-dom'
import { Post } from '../../components/Post'
import { IPost } from '../../utils/globalTypes'
import { PostsFilter } from '../../components/PostsFilter'
import { AsideContent } from './components/AsideContent'

const HomeWrapper = styled('div')(() => ({
  display: 'grid',
  gridTemplate: '1fr / 70px 210px 1fr',
  width: '100%',
  height: '100%'
}))
const MainContent = styled('div')<{ isAsideOpen: boolean }>`
  grid-row: 1;
  grid-column: ${({ isAsideOpen }) => (isAsideOpen ? '3' : '2')} / -1;
  display: grid;
  grid-template: 150px 1fr / 2fr 8fr 3fr;
  overflow-y: scroll;
`
const PostList = styled('div')`
  grid-column: 2;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  gap: 60px;
`
const SearchBarBlock = styled('div')`
  grid-column: 2;
  grid-row: 1;
  display: flex;
  align-items: center;
`

export const Home = () => {
  const { isAsideOpen } = useOutletContext<{ isAsideOpen: boolean }>()
  const posts: IPost[] = [
    {
      id: 1,
      header: 'Заголовок',
      description: 'Description...',
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
    }
  ]

  return (
    <HomeWrapper>
      <AsideMenu isOpen={isAsideOpen}>
        <AsideContent isAsideOpen={isAsideOpen} />
      </AsideMenu>
      <MainContent isAsideOpen={isAsideOpen}>
        <SearchBarBlock>
          <PostsFilter />
        </SearchBarBlock>
        <PostList>
          {posts.map((post) => (
            <Post key={post.id} post={post} isAsideOpen={isAsideOpen} />
          ))}
        </PostList>
      </MainContent>
    </HomeWrapper>
  )
}
