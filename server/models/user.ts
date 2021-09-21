import mongoose, { Schema, Document } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import { Blog } from './blog'

mongoose.set('useCreateIndex', true);

export interface User {
  username: string
  name: string
  passwordHash: string
  blogs: Array<string | Blog>
}

const userSchema = new Schema<User & Document>({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3
  },
  name: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

export const User = mongoose.model<User & Document>('User', userSchema)