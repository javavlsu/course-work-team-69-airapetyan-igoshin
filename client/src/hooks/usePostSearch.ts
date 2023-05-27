import { ChangeEvent, useEffect, useState } from 'react'
import { IPreviewPost } from '../utils/globalTypes'

export const usePostSearch = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState<IPreviewPost[]>([])

  const search = () => {
    // Todo запрос на бэк по серч параметру
    console.log(`/posts?search=${searchText}`)
    setPosts([])
  }

  useEffect(search, [searchText])

  const handleSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  return {
    searchedPosts: posts,
    searchText,
    handleSearchText
  }
}
