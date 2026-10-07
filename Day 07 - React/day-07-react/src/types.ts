export type Priority = "low" | "medium" | "high";

export interface Task {
  readonly id: number;
  title: string;
  done: boolean;
  priority: Priority;
}