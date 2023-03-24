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
import {generateToken} from '../utils/generateToken'

const register = async (registerData: UserType) => {
  const {error} = authSchema.registerSchema.validate(registerData)
  if (error) {
    logger.error(error)
    throw new Error(error.message)
  }
  let data = {}
  const saltRounds = 10
  const hashPassWord = bcrypt.hashSync(registerData.password, saltRounds)
  let arrayResult: any[] = []
  await Promise.all([
    AuthModel.findOne({username: registerData.username}),
    AuthModel.findOne({email: registerData.email}),
    AuthModel.findOne({phone: registerData.phone}),
  ])
    .then(async (values) => {
      arrayResult = [...values]
      if (arrayResult[0]) {
        throw new Error('Account already exists!')
      } else if (arrayResult[1]) {
        throw new Error('Email already exists!')
      } else if (arrayResult[2]) {
        throw new Error('Phone number already exists!')
      } else {
        const user = await AuthModel.create({
          ...registerData,
          password: hashPassWord,
        })
        data = {...pick(user, ['username', 'email', 'createdAt', 'updatedAt'])}
      }
    })
    .catch((err) => {
      throw new Error(err)
    })

  return data
}

const login = async (loginData: UserType) => {
  const {error} = authSchema.loginSchema.validate(loginData)
  if (error) {
    logger.error(error)
    throw new Error('Username Or Password Wrong!')
  }
  let result: any = {}
  const user = await AuthModel.findOne({username: loginData.username})
  if (!user) {
    throw new Error('Username Or Password Wrong!')
  }
  const checkPassword = bcrypt.compareSync(loginData.password, user.password)
  if (checkPassword) {
    const tokens = generateToken({userId: user._id.toString()})
    return (result = {...tokens})
  } else {
    throw new Error('Username Or Password Wrong!')
  }
}

export const authService = {register, login}
