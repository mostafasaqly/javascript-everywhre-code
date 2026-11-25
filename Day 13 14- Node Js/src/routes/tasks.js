import { Router } from 'express'
import { createTask, deleteTask, getTask, listTasks, patchTask } from '../controllers/tasks.js'

const router = Router()

router.get('/', listTasks)
router.get('/:id', getTask)
router.post('/', createTask)
router.patch('/:id', patchTask)
router.delete('/:id', deleteTask)

export default router
