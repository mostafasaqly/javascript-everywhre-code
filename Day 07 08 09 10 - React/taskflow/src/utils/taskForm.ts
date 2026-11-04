import type { Task, TaskFormValues } from "../types/task";
// data transformation function to convert form values to a Task object
export function fromFormValues(values: TaskFormValues): Omit<Task,'id'> {
  return {
    title: values.title,
    description: values.description,
    status: values.status,
    dueDate: values.dueDate || undefined,
  };
}

export function toFromValues(task:Task): TaskFormValues{
  return {
    title: task.title,
    description: task.description,
    status : task.status,
    dueDate: task.dueDate ?? ''
  }
}