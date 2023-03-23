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
    return {message: error.message}
  }
  const saltRounds = 10
  const hashPassWord = bcrypt.hashSync(registerData.password, saltRounds)
  let arrayResult: any[] = []
  await Promise.all([
    AuthModel.findOne({username: registerData.username}),
    AuthModel.findOne({email: registerData.email}),
    AuthModel.findOne({phone: registerData.phone}),
  ]).then((values) => {
    arrayResult = [...values]
  })
  if (arrayResult[0]) {
    return {message: 'Account already exists!'}
  } else if (arrayResult[1]) {
    return {message: 'email already exists!'}
  } else if (arrayResult[2]) {
    return {message: 'phone number already exists!'}
  } else {
    const user = await AuthModel.create({
      ...registerData,
      password: hashPassWord,
    })
    return {
      data: pick(user, ['username', 'email', 'createdAt', 'updatedAt']),
      message: 'register Success!',
    }
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
