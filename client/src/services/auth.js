import axios from 'axios'
import { API } from '../constants';

const topic = '/login'
const url = API + topic;

const getUser = () => {
  try {
    return JSON.parse(window.localStorage.user)
  } catch (error) {
    return null
  }
}

const getToken = () => `bearer ${getUser().token}`

const store = user => {
  window.localStorage.user = JSON.stringify(user)
}

const login = async credentials => {
  const user = (await axios.post(url, credentials)).data
  store(user)
  return user;
}

const logout = () => {
  window.localStorage.clear()
}

const authService = { login, logout, getUser, getToken }
export default authService