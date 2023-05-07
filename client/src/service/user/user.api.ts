import ky from 'ky'
import { IProfile, RegistrationData, UserData } from './user.types'

const PREFIX_API = '/api'

export const login = async (body: FormData) => {
  try {
    return await ky.post(`${PREFIX_API}/login`, { body })
  } catch (e) {
    console.error(e)
  }
}

export const register = async (json: RegistrationData) => {
  try {
    return await ky.post(`${PREFIX_API}/registration`, { json })
  } catch (e) {
    console.error(e)
  }
}

export const logout = async () => {
  try {
    return await ky.get(`${PREFIX_API}/logout`)
  } catch (e) {
    console.error(e)
  }
}

export const getUserData = async () => {
  try {
    return await ky.get(`${PREFIX_API}/user`).json<UserData>()
  } catch (e) {
    return null
  }
}

export const getProfile = async () => {
  try {
    return await ky.get(`${PREFIX_API}/profile`).json<IProfile>()
  } catch (e) {
    throw new Error()
  }
}
