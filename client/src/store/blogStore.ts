import { makeAutoObservable } from 'mobx'

class BlogStore {
  isOwnBlog = true
  isEditMode = false

  constructor() {
    makeAutoObservable(this)
  }
}

export default new BlogStore()
