import { makeAutoObservable } from 'mobx'
import { Blog } from '../utils/globalTypes'

class UserStore {
  systemRole?: string
  loaded = false
  blogs: Pick<Blog, 'name' | 'userRole' | 'id'>[] = []

  constructor() {
    makeAutoObservable(this)
  }

  get isAuth() {
    return !!this.systemRole
  }
}

export default new UserStore()
