import { Router } from 'express'
import { createTask, deleteTask, getTask, listTasks, patchTask } from '../controllers/tasks.js'
import { validateTask } from '../middleware/validate.js'
import { requireAuth } from '../middleware/auth.js'
const router = Router()

router.get('/', listTasks)
router.get('/:id', getTask)
router.post('/',requireAuth, validateTask(), createTask)
router.patch('/:id',requireAuth,validateTask({partial : true}), patchTask)
router.delete('/:id',requireAuth, deleteTask)

export default router
