import logo192 from './assets/logo192.png'
import logo512 from './assets/logo512.png'

const environment = process.env.NODE_ENV

export const PUBLIC_URL = environment === 'development' ? '/' : process.env.PUBLIC_URL

const API_ENDPOINTS = {
  'development': 'http://localhost:3001/api',
  'production': 'https://react-blogs-server.herokuapp.com/api'
}

export const API = API_ENDPOINTS[environment]
export const LOGOS = { logo192, logo512 };

