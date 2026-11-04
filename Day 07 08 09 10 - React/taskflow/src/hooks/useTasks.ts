import type { Task, TaskFormValues } from "../types/task";
import { useLocalStorage } from "./useLocalStorage";
import { tasks as initialTasks } from "../data/tasks";
import { useCallback } from "react";
export function useTasks()
{
    const [tasks, setTasks] = useLocalStorage<Task[]>("taskflow.tasks", initialTasks);

    const addTask = useCallback((values: TaskFormValues, projectId: string) => {
        setTasks((current) => {
            const nextId = current.length > 0 ? Math.max(...current.map((t) => t.id)) + 1 : 1;
            return [...current, { id: nextId, projectId, ...values }];
        });
    }, [setTasks]);

    const updateTask = useCallback((id: number, values: TaskFormValues) => {
        setTasks((current) =>
            current.map((task) => (task.id === id ? { ...task, ...values } : task))
        );
    }, [setTasks]);

    const toggleTask = useCallback((id: number) => {
        setTasks((current) =>
            current.map((task) => (task.id === id ? { ...task, status: task.status === "done" ? "todo" : "done" }
                 : task))
        );
    }, [setTasks]);

    const deleteTask = useCallback((id: number) => {
        setTasks((current) => current.filter((task) => task.id !== id));
    }, [setTasks]);

    const clearDone= useCallback(() => {
        setTasks((current) => current.filter((task) => task.status !== "done"));
    }, [setTasks]);

    return { tasks, addTask, updateTask, toggleTask, deleteTask, clearDone };
}
export type TaskApi = ReturnType<typeof useTasks>;