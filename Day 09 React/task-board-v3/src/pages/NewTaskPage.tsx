import { useNavigate } from "react-router";
import { useBoard } from "../board-context";
import { TaskForm } from "../components/TaskForm";
import { EMPTY_VALUES } from "../validation";

export function NewTaskPage() {
  const { addTask } = useBoard();
  const navigate = useNavigate();

  return (
    <section>
      <h2>New task</h2>
      <TaskForm
        initialValues={EMPTY_VALUES}
        submitLabel="Add task"
        onSubmit={async (values) => {
          const task = await addTask(values); // throws → the form shows the error
          navigate(`/tasks/${task.id}`);
        }}
        onCancel={() => navigate("/")}
      />
    </section>
  );
}