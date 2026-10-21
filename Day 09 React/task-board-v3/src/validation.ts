import type { TaskFormErrors, TaskFormValues } from "./types";

export const EMPTY_VALUES: TaskFormValues = {
  title: "",
  done: false,
  priority: "medium",
  dueDate: "",
  notes: "",
};

// Pure: values in → errors out. An empty object means "valid".
export function validateTask(values: TaskFormValues): TaskFormErrors {
  const errors: TaskFormErrors = {};
  const title = values.title.trim();

  if (title === "") errors.title = "Title is required.";
  else if (title.length < 3) errors.title = "Title must be at least 3 characters.";
  else if (title.length > 80) errors.title = "Title must be 80 characters or fewer.";

  if (values.dueDate !== "" && Number.isNaN(Date.parse(values.dueDate))) {
    errors.dueDate = "Enter a valid date.";
  }

  if (values.notes.length > 500) errors.notes = "Notes must be 500 characters or fewer.";

  return errors;
}