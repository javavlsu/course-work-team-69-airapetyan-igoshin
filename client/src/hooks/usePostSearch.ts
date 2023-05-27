import { ChangeEvent, useEffect, useState } from 'react'
import { IPreviewPost } from '../utils/globalTypes'
import Post from '../domain/Post'

export const usePostSearch = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState<IPreviewPost[]>([])

  const search = async () => {
    const resPosts = await Post.search(searchText)

    setPosts(resPosts)
  }

  useEffect(() => {
    search()
  }, [searchText])

  const handleSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  return {
    searchedPosts: posts,
    searchText,
    handleSearchText
  }
}
