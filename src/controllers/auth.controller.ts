import {Request, Response} from 'express'
import {HttpStatusCode} from '../constants'
import {authService} from '../services/auth.service'
import apiResponse from '../utils/apiResponse'

const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.register(req.body)
    apiResponse(res, HttpStatusCode.OK, 'Register Success!', result, undefined)
  } catch (error: any) {
    apiResponse(res, HttpStatusCode.FORBIDDEN, error.message)
  }
}
const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body)
    apiResponse(res, HttpStatusCode.OK, 'Login Success!', result, undefined)
  } catch (error: any) {
    apiResponse(res, HttpStatusCode.FORBIDDEN, error.message)
  }
}
export const authController = {register, login}
