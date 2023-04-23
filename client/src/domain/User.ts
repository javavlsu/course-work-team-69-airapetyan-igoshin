import { login, RegistrationData, register, logout } from '../service/user'
import UserStore from '../store/userStore'
import { parseCookie } from '../utils/cookieParser'

class User {
  loadRole() {
    UserStore.role = this.getRole()
  }
  getRole() {
    return parseCookie(document.cookie).Role
  }
  async login(json: FormData) {
    const res = await login(json)

    if (res && res.ok) {
      this.loadRole()
    }

    return res
  }

  async register(json: RegistrationData) {
    return register(json)
  }

  async logout(callback?: () => void) {
    await logout()
    UserStore.role = null
    callback && callback()
  }
}

export default new User()
