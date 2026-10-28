import { useState } from "react";
import { tasks as intialtasks } from "../data/tasks";
import Section from "./Section";
import TaskCard from "./TaskCard";
import type { Task } from "../types/task";

function TaskList() {
  // let selectedId: number | null = null;
  const [tasks, setTasks] = useState<Task[]>(intialtasks);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedTask = tasks.find((task) => task.id === selectedId);
  const openCount = tasks.filter((task) => task.status !== "done").length;
  const doneCount = tasks.length - openCount;
  function handleSelectTask(id: number) {
    setSelectedId(id);
  }
  function handleAdd()
  {
    const nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const newTask: Task = {
      id: nextId,
      title: `New Task ${nextId}`,
      description: "This is a new task",
      status: "todo",
    };
    setTasks([...tasks, newTask]);
  }
  function handleToggleTask(id: number) {
    setTasks(tasks.map(task => {
      if (task.id === id) { 
        const newStatus = task.status === "done" ? "todo" : "done";
        return { ...task, status: newStatus };
      }
      return task;
    }));
  }
  function handleDeleteTask(id: number) {
    setTasks(tasks.filter(task => task.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
    }
  }
  function handleClearDone()
  {
    setTasks(tasks.filter(task => task.status !== "done"));
  }

  return (
    <Section title={`My Tasks (${openCount} open, ${doneCount} done)`}>
      <div className ="task-toolbar">
        <button type="button" className="task-button" onClick={handleAdd}>
          + Add Task
        </button>
        <button type="button" className="task-button task-button-danger" onClick={handleClearDone} 
        disabled={doneCount === 0}>
          Clear Done ({doneCount})
        </button>
      </div>
      <p className="task-selected">
        Selected : {selectedTask?.title ?? "None"}
      </p>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          variant={
            task.dueDate && task.status !== "done" ? "urgent" : "default"
          }
          isSelected={task.id === selectedId}
          onSelect={handleSelectTask}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />
      ))}
    </Section>
  );
}

export default TaskList;
