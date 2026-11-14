import { computed } from 'vue'
import type { Task, TaskFormValues } from '../types'
import { findById, removeById } from '../utils/collections'
import { useLocalStorage } from './useLocalStorage'

const defaultTasks: Task[] = [
  {
    id: 1,
    title: 'Design the login page',
    description: 'Sketch the form and the error states',
    status: 'in-progress',
    dueDate: '2026-11-06',
    projectId: 1,
  },
  {
    id: 2,
    title: 'Build the task list',
    description: 'Show every task as a card',
    status: 'todo',
    dueDate: '2026-11-10',
    projectId: 1,
  },
  {
    id: 3,
    title: 'Write the docs',
    description: 'Explain how to run TaskFlow',
    status: 'done',
    projectId: 1,
  },
]

export function useTasks() {
  const tasks = useLocalStorage<Task[]>('taskflow.tasks', defaultTasks)

  const remaining = computed(() => tasks.value.filter((task) => task.status !== 'done').length)

  const counts = computed(() => ({
    todo: tasks.value.filter((task) => task.status === 'todo').length,
    inProgress: tasks.value.filter((task) => task.status === 'in-progress').length,
    done: tasks.value.filter((task) => task.status === 'done').length,
  }))

  function addTask(values: TaskFormValues): void {
    const id = Math.max(0, ...tasks.value.map((task) => task.id)) + 1
    tasks.value.push({
      id,
      title: values.title,
      description: values.description,
      status: values.status,
      dueDate: values.dueDate || undefined,
      projectId: 1,
    })
  }

  function updateTask(id: number, values: TaskFormValues): void {
    const task = findById(tasks.value, id)
    if (!task) return
    task.title = values.title
    task.description = values.description
    task.status = values.status
    task.dueDate = values.dueDate || undefined
  }

  function toggleTask(id: number): void {
    const task = findById(tasks.value, id)
    if (task) task.status = task.status === 'done' ? 'todo' : 'done'
  }

  function deleteTask(id: number): void {
    tasks.value = removeById(tasks.value, id)
  }

  return { tasks, remaining, counts, addTask, updateTask, toggleTask, deleteTask }
}
