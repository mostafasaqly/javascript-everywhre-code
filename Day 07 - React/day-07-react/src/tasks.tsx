import { TaskItem } from "./TaskItem";
import type { Task } from "./types";

const tasks: Task[] = [
  {
    id: 1,
    title: "Learn React",
    done: false,
    priority: "high",
  },
  {
    id: 2,
    title: "Learn Props",
    done: true,
    priority: "medium",
  },
];
export function Tasks() {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
