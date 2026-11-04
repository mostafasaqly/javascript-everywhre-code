import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { SubmitEvent } from "react";
import type { TaskFormValues } from "../types/task";
import Button from "./ui/Button";
interface TaskFormProps {
  initialValues?: TaskFormValues;
  submitLabel: string;
  onSubmit: (values: TaskFormValues) => void;
  onCancel?: () => void;
}
type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
const emptyValues: TaskFormValues = {
  title: "",
  description: "",
  status: "todo",
  dueDate: "",
};
function TaskForm({
  initialValues = emptyValues,
  submitLabel,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [values, setValues] = useState<TaskFormValues>(emptyValues);
  const [error, setError] = useState("");

  const titleRef = useRef<HTMLInputElement>(null);
  useEffect(() => titleRef.current?.focus(), []);
  function handleChange(event: ChangeEvent<FieldElement>) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (values.title.trim().length < 3) {
      setError("Title must be at least 3 characters long");
      return;
    }
    setError("");
    onSubmit(values);
    setValues(initialValues);
    titleRef.current?.focus();
  }
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="form-field">
        <span>Title</span>
        <input
          type="text"
          ref={titleRef}
          placeholder="Task Title"
          name="title"
          value={values.title}
          onChange={handleChange}
          aria-invalid={error !== ""}
        />
      </label>
      <label className="form-field">
        <span>Description</span>
        <textarea
          rows={2}
          placeholder="Task Description"
          name="description"
          value={values.description}
          onChange={handleChange}
        />
      </label>

      <label className="form-field">
        <span>Status</span>
        <select name="status" value={values.status} onChange={handleChange}>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </label>
      <label className="form-field">
        <span>Due Date</span>
        <input
          type="date"
          name="dueDate"
          value={values.dueDate}
          onChange={handleChange}
        />
      </label>
      <div className="form-actions">
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" variant="primary">
          {submitLabel}
        </Button>
        {onCancel && <Button onClick={onCancel}>Cancel</Button> }
      </div>
    </form>
  );
}
export default TaskForm;
