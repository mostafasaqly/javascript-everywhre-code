import { useState } from "react";
import { Header } from "./components/Header";
import { AddTaskForm } from "./components/AddTaskForm";
import { FilterBar } from "./components/Filterbar";
import { TaskList } from "./components/TaskList";
import { Footer } from "./components/Footer";
import { nextId, visibleTasks } from "./tasks";

import type { Filter, Priority, Task } from "./types";

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: "Learn React State",
    done: true,
    priority: "high",
  },
  {
    id: 2,
    title: "Learn Props",
    done: true,
    priority: "low",
  },
  {
    id: 3,
    title: "Build Task Board",
    done: false,
    priority: "high",
  },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  function addTask(title: string, priority: Priority) {
    setTasks((prev) => [
      ...prev,
      {
        id: nextId(prev),
        title,
        done: false,
        priority,
      },
    ]);
  }

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              done: !task.done,
            }
          : task,
      ),
    );
  }

  function removeTask(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function changePriority(id: number, priority: Priority) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              priority,
            }
          : task,
      ),
    );
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((task) => !task.done));
  }

  const visible = visibleTasks(tasks, filter, search);

  const completed = tasks.filter((task) => task.done).length;

  const remaining = tasks.length - completed;

  return (
    <main className="board">
      <Header remaining={remaining} />

      <AddTaskForm onAdd={addTask} />

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        search={search}
        onSearchChange={setSearch}
      />

      <TaskList
        tasks={visible}
        hasTasks={tasks.length > 0}
        onToggle={toggleTask}
        onRemove={removeTask}
        onPriorityChange={changePriority}
      />

      <Footer
        total={tasks.length}
        completed={completed}
        onClearCompleted={clearCompleted}
      />
    </main>
  );
}
