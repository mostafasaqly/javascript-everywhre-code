import { createContext, useContext } from "react";
import type { TasksState } from "./tasksReducer";
import type { TaskFormValues } from "../types/task";

export interface TasksContextValue extends TasksState {
  reload: () => void;
  addTask: (values: TaskFormValues, projectId: string) => Promise<void>;
  updateTask: (id: number, values: TaskFormValues) => Promise<void>;
  toggleTask: (id: number) => Promise<void>;
  deleteTask: (ids: number) => Promise<void>;
  ClearDone : ()=> Promise<void>;
}
export const TasksContext = createContext<TasksContextValue | null>(null);

export function useTasksContext(): TasksContextValue {
  const context = useContext(TasksContext);
    if (!context) {
        throw new Error("useTasksContext must be used within a TasksProvider");
    }
    return context;
}