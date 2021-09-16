require('dotenv').config()

const PORT = process.env.PORT || 3001

const SECRET = process.env.SECRET
if (!SECRET)
  throw new Error("Secret not present in .env-file")

const MONGO_URI = process.env.MONGO_URI
if (!MONGO_URI)
  throw new Error("Mongo URI not present in .env-file")

export default {
  MONGO_URI,
  PORT,
  SECRET,
}