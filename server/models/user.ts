import { set, Document, Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import Blog from './blog';
set('useCreateIndex', true);

interface User extends Document {
  username: string;
  name: string;
  passwordHash: string;
  blogs: Array<Blog>;
}

const userSchema = new Schema({
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
      type: Schema.Types.ObjectId,
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

const User = model('User', userSchema)

export default User;