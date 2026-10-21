import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useBoard } from "../board-context";
import type { Task } from "../types";

export function TaskDetailPage() {
  const { id } = useParams();
  const { tasks, toggleTask, removeTask, addTask } = useBoard();
  const navigate = useNavigate();
  const [duplicating, setDuplicating] = useState(false);

  const task = tasks.find((t) => t.id === Number(id)); // derived from the URL + state

  if (!task) {
    return (
      <section>
        <h2>Task not found</h2>
        <p>There is no task with id “{id}”.</p>
        <Link to="/">← Back to the list</Link>
      </section>
    );
  }

  async function duplicate(original: Task) {
    setDuplicating(true);
    try {
      const { id: _id, ...values } = original; // everything except the id
      const copy = await addTask({ ...values, title: `${original.title} (copy)`, done: false });
      navigate(`/tasks/${copy.id}`);
    } catch {
      setDuplicating(false);
    }
  }

  return (
    <section className="detail">
      <Link to="/" className="back">← All tasks</Link>
      <h2 className={task.done ? "done" : undefined}>{task.title}</h2>

      <dl>
        <dt>Status</dt>
        <dd>{task.done ? "Done" : "Open"}</dd>
        <dt>Priority</dt>
        <dd><span className={`priority priority-${task.priority}`}>{task.priority}</span></dd>
        <dt>Due date</dt>
        <dd>{task.dueDate || "—"}</dd>
        <dt>Notes</dt>
        <dd className="notes">{task.notes || "—"}</dd>
      </dl>

      <div className="actions">
        <button onClick={() => toggleTask(task.id)}>
          {task.done ? "Mark as open" : "Mark as done"}
        </button>
        <Link to={`/tasks/${task.id}/edit`} className="button">Edit</Link>
        <button onClick={() => duplicate(task)} disabled={duplicating}>
          {duplicating ? "Duplicating…" : "Duplicate"}
        </button>
        <button
          className="danger"
          onClick={() => {
            removeTask(task.id);
            navigate("/");
          }}
        >
          Delete
        </button>
      </div>
    </section>
  );
}