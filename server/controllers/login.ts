import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Router } from 'express'
import { User } from '../models/user'

const loginRouter = Router()

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username: username })

  if (!user)
    throw {
      name: 'LoginError',
      message: `No username: ${username} found.`
    }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
  if (!passwordCorrect)
    throw {
      name: 'LoginError',
      message: 'Password incorrect.'
    }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET as string)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

export default loginRouter