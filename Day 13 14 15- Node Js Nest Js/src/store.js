import { mkdir ,readFile, writeFile } from "node:fs/promises";
import path from 'node:path'
import { config} from './config.js'
import { taskEvents } from "./events.js";

const dataFile = path.resolve(config.dataFile)

export async function readTasks()
{
    try{
        const text = await readFile(dataFile, 'utf8')
        return JSON.parse(text)
    }
    catch(error)
    {
        if(error.code === 'ENOENT') return []
        throw error
    }
}
export async function writeTasks(tasks)
{
    await mkdir(path.dirname(dataFile), {recursive : true})
    await writeFile(dataFile, JSON.stringify(tasks,null,2)+ '\n')
}
// Projects

export async function readProjects() {
  const file = path.join(path.dirname(dataFile), 'projects.json')
  return JSON.parse(await readFile(file, 'utf8'))
}
//

export async function addTask({ title, description = '', status = 'todo', projectId = 1 }) {
  const tasks = await readTasks()
  const id = Math.max(0, ...tasks.map((task) => task.id)) + 1
  const task = { id, title, description, status, projectId }
  tasks.push(task)
  await writeTasks(tasks)

  taskEvents.emit('task:created',task)

  return task
}
 
export async function updateTask(id, changes) {
  const tasks = await readTasks()
  const task = tasks.find((item) => item.id === id)
  if (!task) return undefined
  Object.assign(task, changes)
  await writeTasks(tasks)
  return task
}
 
export async function removeTask(id) {
  const tasks = await readTasks()
  const next = tasks.filter((task) => task.id !== id)
  if (next.length === tasks.length) return false
  await writeTasks(next)
  taskEvents.emit('task:removed',id)
  return true
}