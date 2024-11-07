import { Response } from 'express'
import { SECURE_COOKIE } from '../config'

export const sendRefreshToken = (res: Response, refreshToken: string) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: SECURE_COOKIE,
    signed: true,
    sameSite: 'none',
    maxAge: 2592000000
  })
}
