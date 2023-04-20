import { login, RegistrationData, register, logout } from '../service/user'
import UserStore from '../store/userStore'
import { parseCookie } from '../utils/cookieParser'

class User {
  async login(json: FormData) {
    const res = await login(json)

    if (res && res.ok) {
      const c = parseCookie(document.cookie)

      console.log(c)
      // UserStore.role = c.Role
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
