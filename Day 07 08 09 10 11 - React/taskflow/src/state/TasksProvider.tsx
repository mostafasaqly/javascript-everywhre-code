import { useCallback, useEffect, useReducer, type ReactNode } from "react";
import { TasksContext, type TasksContextValue } from "./tasksContext";
import { initialTaskState, tasksReducer } from "./tasksReducer";
import * as api from "../api/tasks";
import type { TaskFormValues } from "../types/task";
import { fromFormValues } from "../utils/taskForm";
function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Somthing went wrong";
}
function TasksProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tasksReducer, initialTaskState);
  const fetchTasks = useCallback(async () => {
    try {
      const tasks = await api.getTasks();
      dispatch({ type: "load_success", tasks });
    } catch (error) {
      dispatch({ type: "load_error", error: errorMessage(error) });
    }
  }, []);

  useEffect(() => {
    void fetchTasks();
  }, [fetchTasks]);

  const reload = useCallback(() => {
    dispatch({ type: "load_start" });
    void fetchTasks();
  }, [fetchTasks]);

  const run = useCallback(async (action: () => Promise<void>) => {
    try {
      await action();
    } catch (error) {
      dispatch({ type: "action_error", error: errorMessage(error) });
    }
  }, []);

  const addTask = useCallback(
    (values: TaskFormValues, projectId: string) =>
      run(async () => {
        const task = await api.createTask({
          ...fromFormValues(values),
          projectId,
        });
        dispatch({ type: "added", task });
      }),
    [run],
  );

  const updateTask = useCallback(
    (id: number, values: TaskFormValues) =>
      run(async () => {
        const curret = state.tasks.find((t) => t.id === id);
        if (!curret) return;
        const task = await api.updateTask({
          ...curret,
          ...fromFormValues(values),
        });
        dispatch({ type: "updated", task });
      }),
    [run, state.tasks],
  );

  const toggleTask = useCallback(
    (id: number) =>
      run(async () => {
        const curret = state.tasks.find((t) => t.id === id);
        if (!curret) return;
        const task = await api.updateTask({
          ...curret,
          status: curret.status === "done" ? "todo" : "done",
        });
        dispatch({ type: "updated", task });
      }),
    [run, state.tasks],
  );

  const deleteTask = useCallback(
    (id: number) =>
      run(async () => {
        await api.deleteTask(id);
        dispatch({ type: "deleted", ids: [id] });
      }),
    [run],
  );

  const ClearDone = useCallback(
    () =>
      run(async () => {
        const doneTaskIds = state.tasks
          .filter((t) => t.status === "done")
          .map((t) => t.id);
        await Promise.all(doneTaskIds.map((id) => api.deleteTask(id)));
        dispatch({ type: "deleted", ids: doneTaskIds });
      }),
    [run, state.tasks],
  );

  const value: TasksContextValue = {
    ...state,
    reload,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    ClearDone,
  };
  return <TasksContext value={value}>{children}</TasksContext>;
}
export default TasksProvider;
