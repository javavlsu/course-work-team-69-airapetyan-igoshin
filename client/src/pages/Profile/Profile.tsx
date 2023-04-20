import React from 'react'
import { AsideMenu } from '../../components/AsideMenu'
import { useOutletContext } from 'react-router-dom'
import { styled } from '@mui/material'
import { Blog as BlogType } from '../../utils/globalTypes'
import { BlogCard } from '../../components/BlogCard'
import { AsideProfileContent } from './components/AsideProfileContent'

const ProfileWrapper = styled('div')`
  height: 100%;
  display: grid;
  grid-template: 1fr / 2fr 1fr 7fr;
`
const ProfileContentWrapper = styled('div')<{ isAsideOpen: boolean }>`
  grid-column: ${({ isAsideOpen }) => (isAsideOpen ? '3' : '2')} / -1;
  display: grid;
  grid-template: 1fr / 1fr 10fr 2fr;
  height: 100%;
  overflow-y: auto;
`
const ProfileContent = styled('div')`
  grid-column: 2;
`
const ProfileContentHeader = styled('h2')`
  font-size: 24px;
  margin: 10px 0;
`
const BlogList = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const Profile = () => {
  const { isAsideOpen } = useOutletContext<{ isAsideOpen: boolean }>()
  const blogs: BlogType[] = [
    {
      id: 1,
      title: 'Название блога',
      description: 'Описание...',
      subscribers: 7456,
      rating: 145,
      picture: ''
    },
    {
      id: 2,
      title: 'Название блога',
      description: 'Описание...',
      subscribers: 7456,
      rating: 145,
      picture: ''
    },
    {
      id: 3,
      title: 'Название блога',
      description: 'Описание...',
      subscribers: 7456,
      rating: 145,
      picture: ''
    },
    {
      id: 4,
      title: 'Название блога',
      description: 'Описание...',
      subscribers: 7456,
      rating: 145,
      picture: ''
    },
    {
      id: 5,
      title: 'Название блога',
      description: 'Описание...',
      subscribers: 7456,
      rating: 145,
      picture: ''
    },
    {
      id: 6,
      title: 'Название блога',
      description: 'Описание...',
      subscribers: 7456,
      rating: 145,
      picture: ''
    }
  ]

  return (
    <ProfileWrapper>
      <AsideMenu background={'transparent'} isOpen={isAsideOpen}>
        <AsideProfileContent isAsideOpen={isAsideOpen} />
      </AsideMenu>
      <ProfileContentWrapper isAsideOpen={isAsideOpen}>
        <ProfileContent>
          <ProfileContentHeader>Блоги</ProfileContentHeader>
          <BlogList>
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </BlogList>
        </ProfileContent>
      </ProfileContentWrapper>
    </ProfileWrapper>
  )
}
