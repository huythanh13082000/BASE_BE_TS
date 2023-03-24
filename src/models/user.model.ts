import mongoose, {Schema} from 'mongoose'
import {UserType} from '../interface/user.type'

const userSchema = new Schema<UserType>(
  {
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, required: true, unique: true},
  },
  {timestamps: true}
)

export const UserModel = mongoose.model<UserType>('User', userSchema)
