import type { Task } from "./types";

export const INITIAL: Task[] = [
  { id: 1, title: "Read the Day 09 README", done: true, priority: "high", dueDate: "", notes: "" },
  { id: 2, title: "Write the board reducer", done: false, priority: "high", dueDate: "2027-01-15", notes: "Pure — test it with node first." },
  { id: 3, title: "Save tasks to localStorage", done: false, priority: "medium", dueDate: "", notes: "" },
];