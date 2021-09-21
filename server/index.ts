import app from './app'
import http from 'http'
import config from './utils/config'
import logger from './utils/logger'

const server = http.createServer(app)

const { PORT } = config;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
