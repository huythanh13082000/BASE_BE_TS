import express from 'express'
import {authController} from '../../controllers/auth'
const route = express.Router()
route.post('/', authController.register)

export const authRoute = route
