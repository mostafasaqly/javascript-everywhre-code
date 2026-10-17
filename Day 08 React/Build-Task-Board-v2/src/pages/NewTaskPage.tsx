import { useNavigate } from "react-router";

import { TaskForm } from "../components/TaskForm";
import { useBoard } from "../board-context";
import { EMPTY_VALUES } from "../validate";

export function NewTaskPage() {
  const { addTask } = useBoard();
  const navigate = useNavigate();

  return (
    <>
      <h2>New task</h2>

      <TaskForm
        initial={EMPTY_VALUES}
        submitLabel="Add task"
        checkPast
        onSubmit={async (values) => {
          const task = await addTask(values);

          navigate(`/tasks/${task.id}`, {
            replace: true,
          });
        }}
      />
    </>
  );
}
