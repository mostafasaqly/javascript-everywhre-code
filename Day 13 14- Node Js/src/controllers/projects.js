import { readProjects, readTasks } from '../store.js'

export async function listProjects(req, res) {
  res.json(await readProjects())
}

export async function listProjectTasks(req, res) {
  const id = Number(req.params.id)
  const projects = await readProjects()
  if (!projects.some((p) => p.id === id)) {
    return res.status(404).json({ error: 'Project not found' })
  }
  const tasks = await readTasks()
  res.json(tasks.filter((t) => t.projectId === id))
}
