import express from 'express'
import cors from 'cors'
import { config } from './config.js'
import { logger} from './middleware/logger.js'
import tasksRouter from './routes/tasks.js'
import projectsRouter from './routes/projects.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import authRouter from './routes/auth.js'
const app = express()

app.disable('x-powered-by')

app.use(cors({
  origin: config.corsOrigin,
  exposedHeaders: ['X-Total-Count'],
}))

app.use(logger)
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})
app.use('/api/auth', authRouter)
app.use('/api/tasks', tasksRouter)
app.use('/api/projects', projectsRouter)

app.use(notFound)
app.use(errorHandler)
export default app

// curl -X POST -H "Content-Type: application/json" 
// -d "{\"title\":\"Learn Express\"}" http://localhost:3000/api/tasks