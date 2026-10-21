import type { Task, TaskFormValues } from "./types";

export type BoardAction =
  | { type: "added"; task: Task }
  | { type: "updated"; id: number; values: TaskFormValues }
  | { type: "toggled"; id: number }
  | { type: "removed"; id: number };

export function boardReducer(tasks: Task[], action: BoardAction): Task[] {
  switch (action.type) {
    case "added":
      return [...tasks, action.task];
    case "updated":
      return tasks.map((t) => (t.id === action.id ? { ...action.values, id: action.id } : t));
    case "toggled":
      return tasks.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t));
    case "removed":
      return tasks.filter((t) => t.id !== action.id);
  }
}

export function nextId(tasks: Task[]): number {
  return tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
}