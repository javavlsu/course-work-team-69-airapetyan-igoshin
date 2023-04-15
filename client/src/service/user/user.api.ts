import ky from "ky";
import {LoginData, LoginResponseData, RegistrationData} from "./user.types";
const PREFIX_API = 'api'
const origin = 'http://localhost:8080'

export const getLoginData = async () => {
  try {
    const response = await ky.get(`/api/login`)
    return await response.json<LoginResponseData>()

  } catch (e) {
    console.error(e)
  }
}

export const login = async (json: LoginData) => {
  try {
    return await ky.post(`/${PREFIX_API}/login`, { json })

  } catch (e) {
    console.error(e)
  }
}

export const register = async (json: RegistrationData) => {
  try {
    return await ky.post(`/${PREFIX_API}/registration`, { json })

  } catch (e) {
    console.error(e)
  }
}