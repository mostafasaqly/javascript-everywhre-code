import { Link, useNavigate, useParams } from "react-router";

import { TaskForm } from "../components/TaskForm";
import { useBoard } from "../board-context";

export function EditTaskPage() {
  const { id } = useParams();

  const { tasks, updateTask } = useBoard();

  const navigate = useNavigate();

  const task = tasks.find((task) => task.id === Number(id));

  if (!task) {
    return (
      <p>
        Task not found. <Link to="/">Back to the list</Link>
      </p>
    );
  }

  return (
    <>
      <h2>Edit task</h2>

      <TaskForm
        key={task.id}
        initial={task}
        submitLabel="Save changes"
        checkPast={false}
        onSubmit={async (values) => {
          await updateTask(task.id, values);

          navigate(`/tasks/${task.id}`, {
            replace: true,
          });
        }}
      />
    </>
  );
}
