import express from 'express'
import {authController} from '../../controllers/auth'
const route = express.Router()
route.post('/register', authController.register)
route.post('/login', authController.login)

export const authRoute = route
