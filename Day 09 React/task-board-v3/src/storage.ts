import type { Task } from "./types";

export const STORAGE_KEY = "task-board";
const PRIORITIES: readonly unknown[] = ["low", "medium", "high"];

function isTask(x: unknown): x is Task {
  if (typeof x !== "object" || x === null) return false;
  const t = x as Record<string, unknown>;
  return (
    typeof t.id === "number" &&
    typeof t.title === "string" &&
    typeof t.done === "boolean" &&
    typeof t.dueDate === "string" &&
    typeof t.notes === "string" &&
    PRIORITIES.includes(t.priority)
  );
}

// null = "nothing usable stored" — the caller decides what to fall back to
export function parseTasks(raw: string | null): Task[] | null {
  if (raw === null) return null;
  try {
    const data: unknown = JSON.parse(raw);
    return Array.isArray(data) ? data.filter(isTask) : null;
  } catch {
    return null;
  }
}

export function readStoredTasks(): Task[] | null {
  try {
    return parseTasks(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null; // storage blocked
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // full or blocked — keep working in memory
  }
}