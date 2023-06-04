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
import { UIEventHandler, useEffect, useMemo } from 'react'
import feedStore from '../../store/feedStore'
import { observer } from 'mobx-react-lite'

const handleScroll: UIEventHandler<HTMLDivElement> = ({ currentTarget }) => {
  const isBottom =
    currentTarget.scrollTop >=
    currentTarget.scrollHeight - currentTarget.offsetHeight - 50

  if (isBottom) {
    feedStore.handlePart()
  }
}

const Home = () => {
  const { isAsideOpen } = useOutletContext<{ isAsideOpen: boolean }>()
  const { handleSearchText, searchText, searchedPosts } = usePostSearch()
  const posts = useMemo(() => {
    return searchedPosts.length > 0 ? searchedPosts : feedStore.feed
  }, [feedStore.feed, searchedPosts])

  useEffect(() => {
    feedStore.getFeed()
  }, [])

  return (
    <HomeWrapper>
      <AsideMenu isOpen={isAsideOpen}>
        <AsideContent isAsideOpen={isAsideOpen} />
      </AsideMenu>
      <MainContent onScroll={handleScroll} isAsideOpen={isAsideOpen}>
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
