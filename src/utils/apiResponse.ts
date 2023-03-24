import {Response} from 'express'

interface ApiResponse {
  status: number
  message?: string
  data?: any
  error?: any
}

export default function apiResponse(
  res: Response,
  status: number,
  message?: string,
  data?: any,
  error?: any
): void {
  const responseData: ApiResponse = {status}
  if (message) responseData.message = message
  if (data) responseData.data = data
  if (error) responseData.error = error

  res.status(status).json(responseData)
}
