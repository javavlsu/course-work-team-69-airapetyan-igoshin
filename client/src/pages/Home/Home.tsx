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
import { useFeed } from '../../hooks/useFeed'
import { usePostSearch } from '../../hooks/usePostSearch'
import { useMemo } from 'react'

export const Home = () => {
  const { isAsideOpen } = useOutletContext<{ isAsideOpen: boolean }>()
  const { feed, handleNewest, handlePopular, toggleSubscribes } = useFeed()
  const { handleSearchText, searchText, searchedPosts } = usePostSearch()
  const posts = useMemo(() => {
    return searchText ? searchedPosts : feed
  }, [feed, searchedPosts])

  return (
    <HomeWrapper>
      <AsideMenu isOpen={isAsideOpen}>
        <AsideContent
          onPopular={handlePopular}
          onNewest={handleNewest}
          onSubscribes={toggleSubscribes}
          isAsideOpen={isAsideOpen}
        />
      </AsideMenu>
      <MainContent isAsideOpen={isAsideOpen}>
        <SearchBarBlock>
          <PostsFilter value={searchText} handleValue={handleSearchText} />
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
