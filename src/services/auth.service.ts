import jwt from 'jsonwebtoken'
import dotenv from 'dotenv/config'
import bcrypt from 'bcrypt'
import {UserModel} from '../models/user.model'
import {UserType} from '../interface/user.type'
import {userSchema} from '../validation/user.validation'
import {pick} from 'lodash'
import logger from '../logs/logger'
import {AuthModel} from '../models/auth'
import {authShema} from '../validation/auth.validation'

const register = async (registerData: UserType) => {
  const {error} = authShema.validate(registerData)
  if (error) {
    logger.error(error)
    throw new Error(error.message)
  }
  const saltRounds = 10
  const hashPassWord = bcrypt.hashSync(registerData.password, saltRounds)
  const user = await AuthModel.create({...registerData, password: hashPassWord})
  return {
    data: pick(user, ['username', 'email', 'createdAt', 'updatedAt']),
    description: 'register Success!',
  }
}

export const authService = {register}
