import {login, getLoginData, LoginData} from "../service/user";

class User {
  async login (json: LoginData) {
    return login(json)
  }
}

export default new User()