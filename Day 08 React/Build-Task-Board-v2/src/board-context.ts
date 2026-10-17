import { useOutletContext } from "react-router";

import type { Task, TaskFormValues } from "./types";

export interface BoardContext {
  tasks: Task[];

  addTask: (values: TaskFormValues) => Promise<Task>;

  updateTask: (id: number, values: TaskFormValues) => Promise<void>;

  toggleTask: (id: number) => void;

  removeTask: (id: number) => void;
}

export function useBoard(): BoardContext {
  return useOutletContext<BoardContext>();
}
