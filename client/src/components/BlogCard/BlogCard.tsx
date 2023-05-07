import React, { FC } from 'react'
import { Blog as BlogType } from '../../utils/globalTypes'
import {
  BlogCardWrapper,
  BlogCardPicture,
  BlogCardContent,
  BlogTitle,
  StatisticsItem,
  StatisticsCount,
  StatisticsBlock,
  BlogDescription
} from './BlogCard.styles'
import { useNavigate } from 'react-router-dom'

interface BlogCardProps {
  blog: BlogType
}

export const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  const navigate = useNavigate()

  const navigateToBlog = () => {
    navigate(`/blog/${blog.id}`)
  }

  return (
    <BlogCardWrapper onClick={navigateToBlog}>
      <BlogCardPicture />
      <BlogCardContent>
        <BlogTitle>{blog.name}</BlogTitle>
        <BlogDescription>{blog.description}</BlogDescription>
      </BlogCardContent>
      <StatisticsBlock>
        <StatisticsItem>
          Подписчиков:{' '}
          <StatisticsCount color="blue">{blog.subscribers}</StatisticsCount>
        </StatisticsItem>
        <StatisticsItem>
          Рейтинг:{' '}
          <StatisticsCount color="green">{blog.rating}</StatisticsCount>
        </StatisticsItem>
      </StatisticsBlock>
    </BlogCardWrapper>
  )
}
