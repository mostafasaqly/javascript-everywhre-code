import { useId, useRef, useState } from "react";

import type { ChangeEvent, FocusEvent, SubmitEvent } from "react";

import type { Priority, TaskFormValues } from "../types";

import { hasErrors, validateTask } from "../validate";

type FieldName = keyof TaskFormValues;
type ErrorField = "title" | "dueDate" | "notes";

interface TaskFormProps {
  initial: TaskFormValues;
  submitLabel: string;
  checkPast: boolean;
  onSubmit: (values: TaskFormValues) => Promise<void>;
}

const PRIORITIES: Priority[] = ["low", "medium", "high"];

export function TaskForm({
  initial,
  submitLabel,
  checkPast,
  onSubmit,
}: TaskFormProps) {
  const [values, setValues] = useState<TaskFormValues>(initial);

  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {},
  );

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const id = useId();

  // Prevent two submits before React re-renders
  const submittingRef = useRef(false);

  // Validation is derived from current values
  const errors = validateTask(values, checkPast);

  function shown(name: ErrorField) {
    return touched[name] ? errors[name] : undefined;
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    const next =
      e.target instanceof HTMLInputElement && e.target.type === "checkbox"
        ? e.target.checked
        : value;

    setValues((prev) => ({
      ...prev,
      [name]: next,
    }));
  }

  function handleBlur(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = e.target.name as FieldName;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (submittingRef.current) return;

    const form = e.currentTarget;

    setTouched({
      title: true,
      dueDate: true,
      notes: true,
    });

    setSubmitError("");

    if (hasErrors(errors)) {
      const first = (["title", "dueDate", "notes"] as const).find(
        (field) => errors[field],
      );

      if (first) {
        form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      }

      return;
    }

    submittingRef.current = true;
    setSubmitting(true);

    try {
      await onSubmit({
        ...values,
        title: values.title.trim(),
      });
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong.",
      );

      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={submitting}>
      <div className="field">
        <label htmlFor={`${id}-title`}>Title</label>

        <input
          id={`${id}-title`}
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={shown("title") ? true : undefined}
          aria-describedby={shown("title") ? `${id}-title-error` : undefined}
        />

        {shown("title") && (
          <p id={`${id}-title-error`} className="error">
            {shown("title")}
          </p>
        )}
      </div>

      <fieldset>
        <legend>Priority</legend>

        {PRIORITIES.map((p) => (
          <label key={p}>
            <input
              type="radio"
              name="priority"
              value={p}
              checked={values.priority === p}
              onChange={handleChange}
            />
            {p}
          </label>
        ))}
      </fieldset>

      <div className="field">
        <label htmlFor={`${id}-due`}>Due date (optional)</label>

        <input
          id={`${id}-due`}
          type="date"
          name="dueDate"
          value={values.dueDate}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={shown("dueDate") ? true : undefined}
          aria-describedby={shown("dueDate") ? `${id}-due-error` : undefined}
        />

        {shown("dueDate") && (
          <p id={`${id}-due-error`} className="error">
            {shown("dueDate")}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor={`${id}-notes`}>Notes</label>

        <textarea
          id={`${id}-notes`}
          name="notes"
          rows={4}
          value={values.notes}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={shown("notes") ? true : undefined}
          aria-describedby={`${id}-notes-count ${
            shown("notes") ? `${id}-notes-error` : ""
          }`}
        />

        <p id={`${id}-notes-count`} className="hint">
          {values.notes.length} / 200
        </p>

        {shown("notes") && (
          <p id={`${id}-notes-error`} className="error">
            {shown("notes")}
          </p>
        )}
      </div>

      <label>
        <input
          type="checkbox"
          name="done"
          checked={values.done}
          onChange={handleChange}
        />
        Already done
      </label>

      {submitError && (
        <p role="alert" className="error">
          {submitError}
        </p>
      )}

      <button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
