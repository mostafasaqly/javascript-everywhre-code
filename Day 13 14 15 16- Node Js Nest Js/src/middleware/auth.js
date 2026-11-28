import jwt from 'jsonwebtoken'
import { config } from '../config.js'
import { HttpError } from '../errors.js'

export function requireAuth(req, res, next) {
  const header = req.get('Authorization') ?? ''
  const [type, token] = header.split(' ')
  if (type !== 'Bearer' || !token) {
    throw new HttpError(401, 'Missing token')
  }
  try {
    req.user = jwt.verify(token, config.jwtSecret)
  } catch {
    throw new HttpError(401, 'Invalid or expired token')
  }
  next()
}
