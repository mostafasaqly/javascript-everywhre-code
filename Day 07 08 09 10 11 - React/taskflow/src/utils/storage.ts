// import type { Task } from '../types/task'

// const STORAGE_KEY = 'taskflow.tasks'

// export function loadTasks(fallback: Task[]): Task[] {
//   try {
//     const saved = localStorage.getItem(STORAGE_KEY)
//     return saved ? (JSON.parse(saved) as Task[]) : fallback
//   } catch {
//     return fallback
//   }
// }

// export function saveTasks(tasks: Task[]) {
//   try {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
//   } catch {
//     // Storage can be full or blocked. The app keeps working without saving.
//   }
// }

export function readJson<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key)
    return saved ? (JSON.parse(saved) as T) : fallback
  }
  catch { 
    return fallback
  }
}
export function writeJson<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  }
  catch {
    // Storage can be full or blocked. The app keeps working without saving.
  } 
}
