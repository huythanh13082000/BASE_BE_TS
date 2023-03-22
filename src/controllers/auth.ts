import {Request, Response} from 'express'
import {authService} from '../services/auth.service'
import {HttpStatusCode} from '../utils/constants'

const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.register(req.body)
    return res.status(HttpStatusCode.OK).json(result)
  } catch (error: any) {
    return res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    })
  }
}
export const authController = {register}
