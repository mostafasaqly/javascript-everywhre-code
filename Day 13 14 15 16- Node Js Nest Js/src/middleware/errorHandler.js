import { HttpError } from '../errors.js'

export function notFound(req, res, next) {
  next(new HttpError(404, `Route not found: ${req.method} ${req.originalUrl}`))
}

export function errorHandler(error, req, res, next) {
  const status = error.status ?? 500
  if (status === 500) console.error(error)
  const message = status === 500 ? 'Something went wrong' : error.message
  res.status(status).json({ error: message })
}
