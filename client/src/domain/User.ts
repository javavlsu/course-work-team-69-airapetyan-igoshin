import {login, getLoginData, LoginData, RegistrationData, register} from "../service/user";

class User {
  async login (json: LoginData) {
    return login(json)
  }

  async register (json: RegistrationData) {
    return register(json)
  }
}

export default new User()