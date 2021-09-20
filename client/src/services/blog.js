import axios from 'axios'
import { API } from '../constants';
import authService from './auth'

const topic = '/blogs'
const url = API + topic;

const config = () => {
  return {
    headers: { Authorization: authService.getToken() }
  }
}


export const getBlogs = async () => {
  const blogs = (await axios.get(url)).data
  return blogs
}

export const create = async blog => {
  const createdBlog = (await axios.post(url, blog, config())).data
  return createdBlog
}

export const remove = async blog => {
  await axios.delete(`${url}/${blog.id}`, config())
  return blog
}

export const like = async blog => {
  blog.likes += 1
  const likedBlog = (await axios.put(`${url}/${blog.id}`, blog)).data
  return likedBlog
}

export const comment = async (blog, comment) => {
  const commentedBlog = (await axios.post(`${url}/${blog.id}/comments`, { comment }, config())).data
  return commentedBlog
}

const blogService = { getBlogs, create, remove, like, comment }
export default blogService