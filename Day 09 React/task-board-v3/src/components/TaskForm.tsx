import { useState } from "react";
import type { FormEvent } from "react";
import type { Priority, TaskFormValues } from "../types";
import { validateTask } from "../validation";

interface TaskFormProps {
  initialValues: TaskFormValues;
  submitLabel: string;
  onSubmit: (values: TaskFormValues) => Promise<void>;
  onCancel: () => void;
}

type Touched = Partial<Record<keyof TaskFormValues, boolean>>;

export function TaskForm({ initialValues, submitLabel, onSubmit, onCancel }: TaskFormProps) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState<Touched>({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const errors = validateTask(values); // derived — never stored
  const hasErrors = Object.keys(errors).length > 0;

  function update<K extends keyof TaskFormValues>(field: K, value: TaskFormValues[K]) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function touch(field: keyof TaskFormValues) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ title: true, dueDate: true, notes: true });
    if (hasErrors || saving) return;

    setSaving(true);
    setServerError(null);
    try {
      await onSubmit({ ...values, title: values.title.trim() });
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setSaving(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={values.title}
          onChange={(e) => update("title", e.target.value)}
          onBlur={() => touch("title")}
          aria-invalid={touched.title && errors.title ? true : undefined}
          aria-describedby="title-error"
          autoFocus
        />
        {touched.title && errors.title && (
          <p id="title-error" className="field-error">{errors.title}</p>
        )}
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={values.priority}
            onChange={(e) => update("priority", e.target.value as Priority)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="dueDate">Due date</label>
          <input
            id="dueDate"
            type="date"
            value={values.dueDate}
            onChange={(e) => update("dueDate", e.target.value)}
            onBlur={() => touch("dueDate")}
          />
          {touched.dueDate && errors.dueDate && <p className="field-error">{errors.dueDate}</p>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          rows={4}
          value={values.notes}
          onChange={(e) => update("notes", e.target.value)}
          onBlur={() => touch("notes")}
        />
        <p className="hint">{values.notes.length}/500</p>
        {touched.notes && errors.notes && <p className="field-error">{errors.notes}</p>}
      </div>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={values.done}
          onChange={(e) => update("done", e.target.checked)}
        />
        Done
      </label>

      {serverError && <p role="alert" className="alert">{serverError}</p>}

      <div className="actions">
        <button type="submit" className="primary" disabled={saving}>
          {saving ? "Saving…" : submitLabel}
        </button>
        <button type="button" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </form>
  );
}