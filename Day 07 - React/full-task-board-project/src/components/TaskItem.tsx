import type { Priority, Task } from "../types";

interface TaskItemProps {
  task: Task;

  onToggle: (id: number) => void;

  onRemove: (id: number) => void;

  onPriorityChange: (id: number, priority: Priority) => void;
}

export function TaskItem({
  task,
  onToggle,
  onRemove,
  onPriorityChange,
}: TaskItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />

      <span>
        {task.done ? "✅ " : ""}
        {task.title}
      </span>

      <select
        value={task.priority}
        onChange={(event) =>
          onPriorityChange(task.id, event.target.value as Priority)
        }
      >
        <option value="low">Low</option>

        <option value="medium">Medium</option>

        <option value="high">High</option>
      </select>

      <button onClick={() => onRemove(task.id)}>×</button>
    </li>
  );
}
