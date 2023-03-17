import {Schema, model, Document} from 'mongoose'
import Joi from 'joi'
import {UserType} from '../interface/user.type'

const UserSchema = new Schema<UserType>({
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
})

export default model<UserType>('User', UserSchema)

export const validateUser = (user: UserType): Joi.ValidationResult => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
  return schema.validate(user)
}
