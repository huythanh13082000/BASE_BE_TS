import mongoose, {Schema, model, Document} from 'mongoose'
import Joi from 'joi'
import {UserType} from '../interface/user.type'

const authSchema = new Schema<UserType>({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  phone: {type: String, required: true, unique: true},
})

export const AuthModel = mongoose.model<UserType>('Auth', authSchema)
