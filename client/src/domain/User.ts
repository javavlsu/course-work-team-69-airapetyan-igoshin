import {
  login,
  RegistrationData,
  register,
  logout,
  getUserData,
  getProfile,
  ChangeProfileData,
  changeUserData
} from '../service/user'
import userStore from '../store/userStore'

class User {
  async getUserData() {
    userStore.loaded = false
    const data = await getUserData()

    userStore.loaded = true

    if (!data) return

    userStore.systemRole = data.systemRole
    userStore.blogs = data.blogs
    userStore.name = data.username
  }

  async login(json: FormData) {
    const res = await login(json)

    if (res && res.ok) {
      this.getUserData()
    }

    return res
  }

  async register(json: RegistrationData) {
    return register(json)
  }

  async logout(callback?: () => void) {
    await logout()
    userStore.systemRole = ''
    userStore.blogs = []
    callback && callback()
  }

  async getProfile() {
    return await getProfile()
  }
  async changeProfile(json: ChangeProfileData) {
    return await changeUserData(json)
  }
}

export default new User()
