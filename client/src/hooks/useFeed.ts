import { useEffect, useState } from 'react'
import { FeedType, IPreviewPost } from '../utils/globalTypes'
import Post from '../domain/Post'

export const useFeed = () => {
  const [feed, setFeed] = useState<IPreviewPost[]>([])
  const [feedType, setFeedType] = useState<FeedType>(FeedType.Popular)
  const [onlySubscription, setOnlySubscription] = useState(false)

  const getFeed = async () => {
    const feedPosts = await Post.getFeed({
      feedType: FeedType[feedType],
      onlySubscription
    })

    setFeed(feedPosts)
  }
  const handlePopular = () => setFeedType(FeedType.Popular)
  const handleNewest = () => setFeedType(FeedType.Latest)
  const toggleSubscribes = () => setOnlySubscription(!onlySubscription)

  useEffect(() => {
    getFeed()
  }, [feedType, onlySubscription])

  return {
    feed,
    handleNewest,
    handlePopular,
    toggleSubscribes
  }
}
