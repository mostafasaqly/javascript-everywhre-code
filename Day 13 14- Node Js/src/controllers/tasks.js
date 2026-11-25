import { addTask, readTasks, removeTask, updateTask } from '../store.js'

export async function listTasks(req, res) {
  res.json(await readTasks())
}

export async function getTask(req, res) {
  const tasks = await readTasks()
  const id = Number(req.params.id)
  const task = tasks.find((item) => item.id === id)
  if (!task) return res.status(404).json({ error: 'Task not found' })
  res.json(task)
}

export async function createTask(req, res) {
  const task = await addTask(req.body)
  res.status(201).json(task)
}

export async function patchTask(req, res) {
  const task = await updateTask(Number(req.params.id), req.body)
  if (!task) return res.status(404).json({ error: 'Task not found' })
  res.json(task)
}

export async function deleteTask(req, res) {
  const id = Number(req.params.id)
  const removed = await removeTask(id)
  if (!removed) return res.status(404).json({ error: 'Task not found' })
  res.status(204).end()
}
