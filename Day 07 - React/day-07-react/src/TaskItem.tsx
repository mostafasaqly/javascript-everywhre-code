import { Button } from "./Button";
import type { Task } from "./types";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  return (
    <>
    
      <li>
        <span>{task.title}</span>

        <span>{task.priority}</span>

        <span>{task.done && <span>✓</span>}</span>
        <Button id={task.id} />
      </li>
    </>
  );
}
