import {formatTask} from './format.js'
import { readTasks } from './store.js'

const tasks = await readTasks()
for(const task of tasks) console.log(formatTask(task))