import type { Task } from "./types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
}

export function TaskItem({
  task,
  onToggle,
}: TaskItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />

      <span>{task.title}</span>
    </li>
  );
}