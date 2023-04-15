import ky from "ky";
import {LoginResponseData} from "./user.types";

export const login = async () => {
  try {
    const response = await ky.get('/login')
    return await response.json<LoginResponseData>()

  } catch (e) {
    console.error(e)
  }
}