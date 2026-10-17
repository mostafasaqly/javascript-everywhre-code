
import type { TaskFormValues } from "./types";

export type TaskErrors = Partial<
  Record<"title" | "dueDate" | "notes", string>
>;

export const EMPTY_VALUES: TaskFormValues = {
  title: "",
  priority: "medium",
  dueDate: "",
  notes: "",
  done: false,
};

export function todayISO(): string {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function validateTask(
  values: TaskFormValues,
  checkPast: boolean
): TaskErrors {
  const errors: TaskErrors = {};
  const title = values.title.trim();

  if (title === "") {
    errors.title = "Give the task a title.";
  } else if (title.length < 3) {
    errors.title = "Use at least 3 characters.";
  } else if (title.length > 80) {
    errors.title = "Keep it under 80 characters.";
  }

  if (
    checkPast &&
    values.dueDate !== "" &&
    values.dueDate < todayISO()
  ) {
    errors.dueDate =
      "The due date can't be in the past.";
  }

  if (values.notes.length > 200) {
    errors.notes =
      "Notes are limited to 200 characters.";
  }

  return errors;
}

export function hasErrors(errors: TaskErrors): boolean {
  return Object.keys(errors).length > 0;
}
