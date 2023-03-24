// auth.model.ts
import {number} from 'joi'
import {Schema, model} from 'mongoose'

const authSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresIn: {
    type: Number,
    required: true,
  },
})

export default model('Auth', authSchema)
