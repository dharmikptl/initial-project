import { randomBytes } from 'crypto'
import { sign } from 'jsonwebtoken'
import { ACCESS_TOKEN_EXPIRE_TIME, JWT_ACCESS_SECRET } from '../config'
import { User } from '../entity/User'

const generateRandomString = () => randomBytes(128).toString('base64')

export const generateTokens = (user: User) => {
  const iat = Math.floor(Date.now() / 1000)
  const exp = Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXPIRE_TIME
  const accessToken = sign(
    {
      id: user.id,
      role: user.role,
      iat,
      exp
    },
    JWT_ACCESS_SECRET
  )
  const refreshToken = generateRandomString()
  return { accessToken, refreshToken, issuedAt: iat, expiresAt: exp }
}
