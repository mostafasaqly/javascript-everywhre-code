
export type Priority = "low" | "medium" | "high";

export type Filter = "all" | "open" | "done";

export interface TaskFormValues {
  title: string;
  priority: Priority;
  dueDate: string;
  notes: string;
  done: boolean;
}

export interface Task extends TaskFormValues {
  readonly id: number;
}
