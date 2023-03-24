import {Request, Response} from 'express'
import { HttpStatusCode } from '../constants'
import {authService} from '../services/auth.service'
import {handleErrors} from '../utils/handleError'

const register = async (req: Request, res: Response) => {
  const [result, error] = await handleErrors(authService.register(req.body))
  if (!error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER).json(result)
  } else return res.status(HttpStatusCode.OK).json(result)
}
const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body)
    return res.status(HttpStatusCode.OK).json(result)
  } catch (error: any) {
    return res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    })
  }
}
export const authController = {register, login}
