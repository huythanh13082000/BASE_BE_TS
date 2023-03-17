import {Request, Response} from 'express'
import {userService} from '../services/user.service'
import {HttpStatusCode} from '../utils/constants'

const createNew = async (req: Request, res: Response) => {
  try {
    const result = await userService.createNew(req.body)
    return res.status(HttpStatusCode.OK).json(result)
  } catch (error: any) {
    return res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    })
  }
}

export const userController = {createNew}
