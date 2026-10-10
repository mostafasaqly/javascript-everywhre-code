import type { Priority, Task } from "../types";

import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];

  hasTasks: boolean;

  onToggle: (id: number) => void;

  onRemove: (id: number) => void;

  onPriorityChange: (id: number, priority: Priority) => void;
}

export function TaskList({
  tasks,
  hasTasks,
  onToggle,
  onRemove,
  onPriorityChange,
}: TaskListProps) {
  if (!hasTasks) {
    return <p className="empty">No tasks yet. Add your first task.</p>;
  }

  if (tasks.length === 0) {
    return <p className="empty">No matching tasks.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onRemove={onRemove}
          onPriorityChange={onPriorityChange}
        />
      ))}
    </ul>
  );
}
