import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import {connectMongoDB} from './config/mongodb'
import { authRoute } from './routers/v1/auth.route'

export const app = express()

connectMongoDB()
  .then(() => {
    console.log('Connected successfully to database!')
  })
  .then(() => {
    bootServer()
  })
  .catch((error: any) => {
    console.log(error)
  })

const bootServer = () => {
  const port = process.env.APP_POST
  const host = process.env.APP_HOST
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log(`Open http://${host}:${port}`)
  })
  app.use(express.json())
  app.use('/api/v1/auth', authRoute)
}
