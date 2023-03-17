import jwt from 'jsonwebtoken'
import dotenv from 'dotenv/config'
import bcrypt from 'bcrypt'
import {UserModel} from '../models/user.model'
import {UserType} from '../interface/user.type'
import {userSchema} from '../validation/user.validation'
import {pick} from 'lodash'

const createNew = async (userData: UserType) => {
  const {error} = userSchema.validate(userData)
  if (error) {
    throw new Error(error.message)
  }
  const saltRounds = 10
  const hashPassWord = bcrypt.hashSync(userData.password, saltRounds)
  const user = await UserModel.create({...userData, password: hashPassWord})
  return {
    data: pick(user, ['username', 'email', 'createdAt', 'updatedAt']),
    description: 'Create User Success!',
  }
}

export const userService = {createNew}
