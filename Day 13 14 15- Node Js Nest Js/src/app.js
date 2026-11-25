import express from 'express'
import { logger} from './middleware/logger.js'
import tasksRouter from './routes/tasks.js'
import projectsRouter from './routes/projects.js'
const app = express()

app.use(logger)
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/tasks', tasksRouter)
app.use('/api/projects', projectsRouter)
export default app

// curl -X POST -H "Content-Type: application/json" 
// -d "{\"title\":\"Learn Express\"}" http://localhost:3000/api/tasks