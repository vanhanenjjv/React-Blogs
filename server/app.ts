import express from 'express'
import 'express-async-errors'

import mongoose from 'mongoose'
import cors from 'cors'
import config from './utils/config'
import logger from './utils/logger'
import middleware from './utils/middleware'
import blogsRouter from './controllers/blogs'
import usersRouter from './controllers/users'
import loginRouter from './controllers/login'
import testRouter from './controllers/testing'

const app = express()

const { MONGO_URI } = config;

const connect = async () => {
  logger.info('connecting to', MONGO_URI)
  const options = { useNewUrlParser: true, useUnifiedTopology: true }
  console.log('niiiih', MONGO_URI)
  await mongoose.connect(MONGO_URI, options)
  logger.info('connected to MongoDB')
}

connect()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// if (process.env.NODE_ENV === 'test')
app.use('/api/testing', testRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
