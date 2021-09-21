import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3001
const MONGO_URI = process.env.MONGO_URI as string

export default {
  MONGO_URI,
  PORT
}