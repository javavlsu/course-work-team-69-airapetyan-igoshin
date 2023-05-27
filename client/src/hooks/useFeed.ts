import { useEffect, useState } from 'react'
import { IPreviewPost } from '../utils/globalTypes'

export enum FeedType {
  Popular,
  Newest
}

const posts: IPreviewPost[] = [
  {
    id: 1,
    title: 'Заголовок',
    description: 'Description...',
    rating: 145
  },
  {
    id: 2,
    title: 'Заголовок',
    description: 'Description...',
    rating: 145
  }
]

export const useFeed = () => {
  const [feed, setFeed] = useState<IPreviewPost[]>([])
  const [feedType, setFeedType] = useState<FeedType>(FeedType.Popular)
  const [onlySubscribes, setOnlySubscribes] = useState(false)

  const getFeed = () => {
    // Todo перенсти на сервис и реальный API
    setFeed(posts)
    console.log(
      `/posts?feed=${FeedType[feedType]}&onlySubscribes=${onlySubscribes}`
    )
  }
  const handlePopular = () => setFeedType(FeedType.Popular)
  const handleNewest = () => setFeedType(FeedType.Newest)
  const toggleSubscribes = () => setOnlySubscribes(!onlySubscribes)

  useEffect(() => {
    getFeed()
  }, [feedType, onlySubscribes])

  return {
    feed,
    handleNewest,
    handlePopular,
    toggleSubscribes
  }
}
