export const logo192 = require('./assets/logo192.png')
export const logo512 = require('./assets/logo512.png')

const environment = process.env.NODE_ENV

export const PUBLIC_URL = environment === 'development' ? '/' : process.env.PUBLIC_URL

const API_ENDPOINTS = {
  'development': 'http://localhost:3001/api',
  'production': 'https://react-blogs-server.herokuapp.com/api'
}

export const API = API_ENDPOINTS[environment]

