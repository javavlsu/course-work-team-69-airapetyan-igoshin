import { AsideMenu } from '../../components/AsideMenu'
import { useOutletContext } from 'react-router-dom'
import { Post } from '../../components/Post'
import { PostsFilter } from '../../components/PostsFilter'
import { AsideContent } from './components/AsideContent'
import {
  HomeWrapper,
  MainContent,
  PostList,
  SearchBarBlock
} from './Home.style'
import { usePostSearch } from '../../hooks/usePostSearch'
import { UIEventHandler, useEffect, useMemo, useRef } from 'react'
import feedStore from '../../store/feedStore'
import { observer } from 'mobx-react-lite'

const handleScroll: UIEventHandler<HTMLDivElement> = async ({
  currentTarget
}) => {
  const isBottom =
    currentTarget.scrollTop >=
    currentTarget.scrollHeight - currentTarget.offsetHeight - 50

  if (isBottom && !feedStore.isLoading) {
    feedStore.turnOnLoading()
    await feedStore.handlePart()
    feedStore.turnOffLoading()
  }
}

const Home = () => {
  const { isAsideOpen } = useOutletContext<{ isAsideOpen: boolean }>()
  const { handleSearchText, searchText, searchedPosts } = usePostSearch()
  const scrollableRef = useRef<HTMLDivElement>(null)
  const posts = useMemo(() => {
    return searchedPosts.length || searchText.length > 0
      ? searchedPosts
      : feedStore.feed
  }, [feedStore.feed, searchedPosts])

  useEffect(() => {
    feedStore.getFeed()
    feedStore.setScrollableContent(scrollableRef)
  }, [])

  return (
    <HomeWrapper>
      <AsideMenu isOpen={isAsideOpen}>
        <AsideContent isAsideOpen={isAsideOpen} />
      </AsideMenu>
      <MainContent
        ref={scrollableRef}
        onScroll={handleScroll}
        isAsideOpen={isAsideOpen}
      >
        <SearchBarBlock>
          <PostsFilter value={searchText} handleValue={handleSearchText} />
        </SearchBarBlock>
        <PostList>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </PostList>
      </MainContent>
    </HomeWrapper>
  )
}

export default observer(Home)
