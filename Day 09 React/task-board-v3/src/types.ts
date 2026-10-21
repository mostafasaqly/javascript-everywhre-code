export type Priority = "low" | "medium" | "high";

export interface Task {
  id: number;
  title: string;
  done: boolean;
  priority: Priority;
  dueDate: string; // "" = no due date, otherwise "YYYY-MM-DD"
  notes: string;
}

// What the form edits: everything except the id
export type TaskFormValues = Omit<Task, "id">;

export type TaskFormErrors = Partial<Record<keyof TaskFormValues, string>>;

export type Filter = "all" | "open" | "done";
export type Sort = "none" | "due" | "priority";