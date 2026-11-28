import { Router } from 'express'
import { listProjects, listProjectTasks } from '../controllers/projects.js'

const router = Router()

router.get('/', listProjects)
router.get('/:id/tasks', listProjectTasks)

export default router
