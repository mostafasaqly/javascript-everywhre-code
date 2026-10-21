import { createContext, useContext } from "react";
import type { Task, TaskFormValues } from "./types";

export interface Board {
  tasks: Task[];
  addTask: (values: TaskFormValues) => Promise<Task>;
  updateTask: (id: number, values: TaskFormValues) => Promise<void>;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
}

export const BoardContext = createContext<Board | null>(null);

export function useBoard(): Board {
  const board = useContext(BoardContext);
  if (board === null) throw new Error("useBoard must be used inside <BoardProvider>");
  return board;
}