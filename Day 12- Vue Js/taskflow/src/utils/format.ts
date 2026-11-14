import type { TaskStatus } from '../types'

export function statusLabel(status: TaskStatus): string {
  if (status === 'todo') return 'To do'
  if (status === 'in-progress') return 'In progress'
  return 'Done'
}

export function formatDueDate(date?: string): string {
  return date ? 'Due ' + date : 'No due date'
}
