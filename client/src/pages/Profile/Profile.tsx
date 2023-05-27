import React from 'react'
import { AsideMenu } from '../../components/AsideMenu'
import { useOutletContext } from 'react-router-dom'
import { BlogCard } from '../../components/BlogCard'
import { AsideProfileContent } from './components/AsideProfileContent/AsideProfileContent'
import {
  ProfileWrapper,
  ProfileContentWrapper,
  ProfileContentHeader,
  ProfileContent,
  BlogList
} from './Profile.styles'
import { useProfile } from '../../hooks/useProfile'

export const Profile = () => {
  const { isAsideOpen } = useOutletContext<{ isAsideOpen: boolean }>()
  const { profile } = useProfile()

  return (
    <ProfileWrapper>
      <AsideMenu background={'transparent'} isOpen={isAsideOpen}>
        <AsideProfileContent isAsideOpen={isAsideOpen} />
      </AsideMenu>
      <ProfileContentWrapper isAsideOpen={isAsideOpen}>
        <ProfileContent>
          <ProfileContentHeader>Блоги</ProfileContentHeader>
          <BlogList>
            {profile?.blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </BlogList>
        </ProfileContent>
      </ProfileContentWrapper>
    </ProfileWrapper>
  )
}
