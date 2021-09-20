import axios from 'axios'
import { API } from '../constants';

const topic = '/users'
const url = API + topic;

export const getUsers = async () => {
  return (await axios.get(url)).data
}

const userService = { getUsers }
export default userService