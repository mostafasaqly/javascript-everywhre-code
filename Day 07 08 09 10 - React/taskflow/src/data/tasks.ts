import type { Task } from "../types/task"

export const tasks:Task[] = [
    {
        id: 1,
        title: "Sample Task",
        description: "This is a sample task",
        status: "todo",
        dueDate: '2026-11-05',
        projectId: "website"
    },
    {
        id :2,
        title: "Sample Task 2",
        description: "This is a sample task 2",
        status: "in-progress",
        projectId: "mobile"
    },
    {
        id:3,
        title: "Sample Task 3",
        description: "This is a sample task 3",
        status: "done",
        dueDate: '2026-11-12',
        projectId: "marketing"
    }
]
