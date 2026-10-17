import { useState } from "react";
import { NavLink, Outlet } from "react-router";

import { pretendToSave } from "./fakeApi";

import type { BoardContext } from "./board-context";
import type { Task, TaskFormValues } from "./types";

const INITIAL: Task[] = [
  {
    id: 1,
    title: "Read the Day 08 README",
    done: true,
    priority: "high",
    dueDate: "",
    notes: "",
  },
  {
    id: 2,
    title: "Build the task form",
    done: false,
    priority: "high",
    dueDate: "2027-01-15",
    notes: "Validation on blur and on submit.",
  },
  {
    id: 3,
    title: "Add the routes",
    done: false,
    priority: "medium",
    dueDate: "",
    notes: "",
  },
];

export function Layout() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL);

  // CREATE
  async function addTask(values: TaskFormValues): Promise<Task> {
    await pretendToSave(values.title);

    const task: Task = {
      ...values,
      id: tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1,
    };

    setTasks((prev) => [...prev, task]);

    return task;
  }

  // UPDATE
  async function updateTask(id: number, values: TaskFormValues): Promise<void> {
    await pretendToSave(values.title);

    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...values, id } : task)),
    );
  }

  // TOGGLE STATUS
  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  // DELETE
  function removeTask(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  const context: BoardContext = {
    tasks,
    addTask,
    updateTask,
    toggleTask,
    removeTask,
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Board</h1>

        <nav aria-label="Main">
          <NavLink to="/" end>
            Tasks
          </NavLink>

          <NavLink to="/tasks/new">New task</NavLink>
        </nav>
      </header>

      <main>
        <Outlet context={context} />
      </main>
    </div>
  );
}
