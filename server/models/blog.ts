import { Document, Schema, model, set } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

set('useFindAndModify', false)
set('useCreateIndex', true);

interface Blog extends Document {
  _id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
  __v: number;
  user: string;
}

const blogSchema = new Schema<Blog>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  likes: { type: Number, default: 0 },
  user: {
    type: Schema.Types.ObjectId,
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
const Blog = model('Blog', blogSchema)
export default Blog