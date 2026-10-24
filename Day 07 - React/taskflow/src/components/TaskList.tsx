import { tasks } from "../data/tasks";
import Section from "./Section";
import TaskCard from "./TaskCard";

function TaskList() {
  function handleSelectTask(id: number) {
    console.log(`Task selected with id: ${id}`);
  }
  return (
    <Section title="My Tasks">
      <TaskCard task={tasks[0]} variant="urgent" onSelect={handleSelectTask} />
      <TaskCard task={tasks[1]} onSelect={handleSelectTask} />
      <TaskCard task={tasks[2]} onSelect={handleSelectTask} />
    </Section>
  );
}

export default TaskList;
