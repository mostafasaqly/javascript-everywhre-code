import { Link, useNavigate, useParams } from "react-router";

import { useBoard } from "../board-context";

export function TaskDetailPage() {
  const { id } = useParams();

  const { tasks, removeTask } = useBoard();

  const navigate = useNavigate();

  const task = tasks.find((task) => task.id === Number(id));

  if (!task) {
    return (
      <>
        <h2>Task not found</h2>
        <p>There's no task with id "{id}".</p>
        <Link to="/">Back to the list</Link>
      </>
    );
  }

  return (
    <article>
      <h2>{task.title}</h2>

      <p>
        Priority: {task.priority} — {task.done ? "done" : "open"}
      </p>

      {task.dueDate && <p>Due: {task.dueDate}</p>}

      {task.notes && <p>{task.notes}</p>}

      <Link to={`/tasks/${task.id}/edit`}>Edit</Link>

      <button
        type="button"
        onClick={() => {
          removeTask(task.id);
          navigate("/");
        }}
      >
        Delete
      </button>
    </article>
  );
}
