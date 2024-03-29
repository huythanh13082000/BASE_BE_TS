import jwt from 'jsonwebtoken'

export const generateToken = (payload: {userId: string}) => {
  const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN || '', {
    expiresIn: Math.floor(Date.now() / 1000) + 60 * 10,
  })
  const refreshToken = jwt.sign(
    payload,
    process.env.SECRET_REFRESH_TOKEN || '',
    {
      expiresIn: '24h',
    }
  )
  const expAccessToken = Math.floor(Date.now() / 1000) + 60 * 10
  const expRefreshToken = Math.floor(Date.now() / 1000) + 60 * 10 * 144
  return {accessToken, refreshToken, expAccessToken, expRefreshToken}
}
