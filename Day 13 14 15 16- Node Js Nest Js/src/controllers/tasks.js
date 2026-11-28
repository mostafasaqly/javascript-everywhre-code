import { addTask, readTasks, removeTask, updateTask } from '../store.js'
import { HttpError } from '../errors.js'
export async function listTasks(req, res) {
  const { status, q, projectId } = req.query
  const { sort = 'id', order = 'asc', page, limit } = req.query
  let tasks = await readTasks()
 
  if (status) {
    tasks = tasks.filter((t) => t.status === status)
  }
  if (projectId) {
    tasks = tasks.filter((t) => t.projectId === Number(projectId))
  }
  if (q) {
    const text = String(q).toLowerCase()
    tasks = tasks.filter((t) => t.title.toLowerCase().includes(text))
  }
 
  const dir = order === 'desc' ? -1 : 1
  tasks.sort((a, b) => (a[sort] > b[sort] ? dir : a[sort] < b[sort] ? -dir : 0))
 
  res.set('X-Total-Count', String(tasks.length))
 
  if (page || limit) {
    const size = Math.min(100, Math.max(1, Number(limit) || 10))
    const start = (Math.max(1, Number(page) || 1) - 1) * size
    tasks = tasks.slice(start, start + size)
  }
  res.json(tasks)

  //curl "http://localhost:3000/api/tasks?status=todo&sort=title&page=1&limit=2"
}

export async function getTask(req, res) {
  const tasks = await readTasks()
  const id = Number(req.params.id)
  const task = tasks.find((item) => item.id === id)
  if (!task) throw new HttpError(404, 'Task not found')
  res.json(task)
}

export async function createTask(req, res) {
  const task = await addTask(req.body)
  res.status(201).json(task)
}

export async function patchTask(req, res) {
  const task = await updateTask(Number(req.params.id), req.body)
  if (!task) throw new HttpError(404, 'Task not found')
  res.json(task)
}

export async function deleteTask(req, res) {
  const id = Number(req.params.id)
  const removed = await removeTask(id)
  if (!removed) throw new HttpError(404, 'Task not found')
  res.status(204).end()
}
