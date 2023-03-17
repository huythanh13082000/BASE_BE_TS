import express from 'express'
import {userController} from '../../controllers/user.controller'
const route = express.Router()
route.post('/', userController.createNew)

export const userRoute = route
