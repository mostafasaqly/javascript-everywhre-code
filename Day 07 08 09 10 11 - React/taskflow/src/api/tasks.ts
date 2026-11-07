import type { Task } from "../types/task";

const API_URL = "http://localhost:3001";
async function request<T>(path: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
        headers : {
            "Content-Type" : "application/json"
        },
        ...options
    });
    if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
}

export function getTasks() {
    return request<Task[]>("/tasks");
}
export function createTask(task: Omit<Task, "id">) {
    return request<Task>("/tasks", {
        method: "POST",
        body: JSON.stringify(task)
    });
}
export function updateTask(task: Task) {
    return request<Task>(`/tasks/${task.id}`, {
        method: "PUT",
        body: JSON.stringify(task)
    });
}
export function deleteTask(id: number) {
    return request<unknown>(`/tasks/${id}`, {
        method: "DELETE"
    });
}
