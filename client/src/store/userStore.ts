import { makeAutoObservable } from 'mobx'

class UserStore {
  role: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  get isAuth() {
    return !!this.role
  }
}

export default new UserStore()
