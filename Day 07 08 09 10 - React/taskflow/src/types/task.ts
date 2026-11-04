export type TaskStatus = 'todo' | 'in-progress' | 'done'

export interface Task {
  id: number
  title: string
  description: string
  status: TaskStatus
  dueDate? :string
  projectId: string
}
export interface TaskFormValues
{
  title: string
  description: string
  status: TaskStatus
  dueDate: string
}