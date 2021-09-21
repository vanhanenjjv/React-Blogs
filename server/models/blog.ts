import mongoose, { model, Schema, Document } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import { User } from './user'

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true);

export interface Blog {
  title: string
  author: string
  url: string
  likes: number
  user: User
  comments: string[]
}

const blogSchema = new Schema<Blog & Document>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    { type: String, minlength: 1 }
  ]
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

blogSchema.plugin(uniqueValidator)

export const Blog = model<Blog & Document>('Blog', blogSchema)
