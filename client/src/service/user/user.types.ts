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
  username: string
  systemRole: string
  blogs: Pick<Blog, 'name' | 'userRole' | 'id'>[]
}

export interface IProfile {
  name: string
  profileImage: string
  birthdate: Date
  status: string
  email: string
  blogs: Blog[]
}

export type ChangeProfileData = Omit<IProfile, 'profileImage' | 'blogs'> & {
  password: string
}
