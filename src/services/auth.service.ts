import jwt from 'jsonwebtoken'
import dotenv from 'dotenv/config'
import bcrypt from 'bcrypt'
import {UserModel} from '../models/user.model'
import {UserType} from '../interface/user.type'
import {userSchema} from '../validation/user.validation'
import {pick} from 'lodash'
import logger from '../logs/logger'
import {AuthModel} from '../models/auth'
import {authSchema} from '../validation/auth.validation'

const register = async (registerData: UserType) => {
  const {error} = authSchema.registerSchema.validate(registerData)
  if (error) {
    logger.error(error)
    throw new Error(error.message)
  }
  const saltRounds = 10
  const hashPassWord = bcrypt.hashSync(registerData.password, saltRounds)
  const user = await AuthModel.create({...registerData, password: hashPassWord})
  return {
    data: pick(user, ['username', 'email', 'createdAt', 'updatedAt']),
    message: 'register Success!',
  }
}

const login = async (loginData: UserType) => {
  const {error} = authSchema.loginSchema.validate(loginData)
  if (error) {
    logger.error(error)
    throw new Error('Username Or Password Wrong!')
  }
  const user = await AuthModel.findOne({username: loginData.username})
  if (!user) {
    throw new Error('Username Or Password Wrong!')
  }
  const checkPassword = bcrypt.compareSync(loginData.password, user.password)
  console.log(checkPassword)
  if (checkPassword) {
    return {
      description: 'Login Success',
    }
  } else {
  }
}

export const authService = {register, login}
