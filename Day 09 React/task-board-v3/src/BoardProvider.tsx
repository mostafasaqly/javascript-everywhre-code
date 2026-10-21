import { useEffect, useReducer } from "react";
import type { ReactNode } from "react";
import { BoardContext } from "./board-context";
import type { Board } from "./board-context";
import { boardReducer, nextId } from "./board-reducer";
import { pretendToSave } from "./fakeApi";
import { INITIAL } from "./initial-tasks";
import { readStoredTasks, saveTasks } from "./storage";
import type { Task, TaskFormValues } from "./types";

function loadTasks(): Task[] {
  return readStoredTasks() ?? INITIAL;
}

export function BoardProvider({ children }: { children: ReactNode }) {
  // The third argument is an initializer: called ONCE, like useState(fn)
  const [tasks, dispatch] = useReducer(boardReducer, undefined, loadTasks);

  // Keep localStorage in sync with the state — an external system
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  async function addTask(values: TaskFormValues): Promise<Task> {
    await pretendToSave(values.title); // may throw — the form catches it
    const task: Task = { ...values, id: nextId(tasks) };
    dispatch({ type: "added", task });
    return task;
  }

  async function updateTask(id: number, values: TaskFormValues): Promise<void> {
    await pretendToSave(values.title);
    dispatch({ type: "updated", id, values });
  }

  const value: Board = {
    tasks,
    addTask,
    updateTask,
    toggleTask: (id) => dispatch({ type: "toggled", id }),
    removeTask: (id) => dispatch({ type: "removed", id }),
  };

  return <BoardContext value={value}>{children}</BoardContext>;
}