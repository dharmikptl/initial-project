import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface RequestWithAuthUser extends Request {
  user: any
}

export const authTokenMiddleware = (secret: string): any => {
  return (req: RequestWithAuthUser, _res: Response, next: NextFunction) => {
    const token = req.headers['authorization']
    if (token) {
      try {
        const user = verify(token, secret)
        req.user = user
      } catch (err) {}
    }
    next()
  }
}
