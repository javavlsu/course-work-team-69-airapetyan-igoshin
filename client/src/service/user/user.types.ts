import { Blog } from '../../utils/globalTypes'

export interface LoginData {
  username: string
  password: string
}

export interface RegistrationData {
  name: string
  email: string
  password: string
  birthdate: string
}

export interface UserData {
  systemRole: string
  blogs: Pick<Blog, 'name' | 'userRole' | 'id'>[]
}
