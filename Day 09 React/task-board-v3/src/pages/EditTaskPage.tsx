import { Link, useNavigate, useParams } from "react-router";
import { useBoard } from "../board-context";
import { TaskForm } from "../components/TaskForm";

export function EditTaskPage() {
  const { id } = useParams();
  const { tasks, updateTask } = useBoard();
  const navigate = useNavigate();

  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return (
      <section>
        <h2>Task not found</h2>
        <Link to="/">← Back to the list</Link>
      </section>
    );
  }

  const { id: taskId, ...values } = task;

  return (
    <section>
      <h2>Edit task</h2>
      {/* key: a different task → a brand-new form with fresh state */}
      <TaskForm
        key={taskId}
        initialValues={values}
        submitLabel="Save changes"
        onSubmit={async (newValues) => {
          await updateTask(taskId, newValues);
          navigate(`/tasks/${taskId}`);
        }}
        onCancel={() => navigate(`/tasks/${taskId}`)}
      />
    </section>
  );
}