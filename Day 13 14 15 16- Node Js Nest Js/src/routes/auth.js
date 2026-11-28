import jwt from 'jsonwebtoken'
import { Router } from 'express'
import { config } from '../config.js'
import { HttpError } from '../errors.js'

const router = Router()

// Demo users only. A real app stores hashed passwords in a database.
const users = [{ name: 'mostafa', password: 'taskflow123' }]

router.post('/login', (req, res) => {
  const { name, password } = req.body ?? {}
  const user = users.find((u) => u.name === name)
  if (!user || user.password !== password) {
    throw new HttpError(401, 'Wrong name or password')
  }
  const token = jwt.sign({ name }, config.jwtSecret, {
    expiresIn: '1h',
  })
  res.json({ token, name })
})

export default router
