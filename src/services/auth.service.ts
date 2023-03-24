import bcrypt from 'bcrypt'
import {pick} from 'lodash'
import {UserType} from '../interface/user.type'
import logger from '../logs/logger'
import authModel from '../models/auth.model'
import {UserModel} from '../models/user.model'
import {generateToken} from '../utils/generateToken'
import {authSchema} from '../validation/auth.validation'

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
    UserModel.findOne({username: registerData.username}),
    UserModel.findOne({email: registerData.email}),
    UserModel.findOne({phone: registerData.phone}),
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
        const user = await UserModel.create({
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
  const user = await UserModel.findOne({username: loginData.username})
  if (!user) {
    throw new Error('Username Or Password Wrong!')
  }
  const checkPassword = bcrypt.compareSync(loginData.password, user.password)
  if (checkPassword) {
    const tokens = generateToken({userId: user._id.toString()})
    await authModel.create({
      userId: user._id,
      expiresIn: tokens.expRefreshToken,
      token: tokens.refreshToken,
    })
    return (result = {...tokens})
  } else {
    throw new Error('Username Or Password Wrong!')
  }
}

export const authService = {register, login}
