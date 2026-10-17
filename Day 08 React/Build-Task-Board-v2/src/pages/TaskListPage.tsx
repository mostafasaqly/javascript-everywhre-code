import { Link, useSearchParams } from "react-router";

import { useBoard } from "../board-context";
import type { Filter, Task } from "../types";

const FILTERS: Filter[] = ["all", "open", "done"];

function parseFilter(raw: string | null): Filter {
  return FILTERS.find((f) => f === raw) ?? "all";
}

function matches(task: Task, filter: Filter, q: string): boolean {
  const okFilter =
    filter === "all" || (filter === "done" ? task.done : !task.done);

  const okSearch =
    q === "" || task.title.toLowerCase().includes(q.toLowerCase());

  return okFilter && okSearch;
}

export function TaskListPage() {
  const { tasks, toggleTask, removeTask } = useBoard();

  const [searchParams, setSearchParams] = useSearchParams();

  const filter = parseFilter(searchParams.get("filter"));
  const q = searchParams.get("q") ?? "";

  const visible = tasks.filter((task) => matches(task, filter, q));

  function update(name: "filter" | "q", value: string) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);

        if (value === "" || value === "all") {
          next.delete(name);
        } else {
          next.set(name, value);
        }

        return next;
      },
      { replace: true },
    );
  }

  return (
    <>
      <h2>Tasks</h2>

      <div className="filter-bar">
        <div role="group" aria-label="Filter tasks">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => update("filter", f)}
            >
              {f}
            </button>
          ))}
        </div>

        <input
          type="search"
          value={q}
          onChange={(e) => update("q", e.target.value)}
          placeholder="Search tasks..."
          aria-label="Search tasks"
        />
      </div>

      {visible.length === 0 ? (
        <p className="empty">
          {tasks.length === 0 ? "No tasks yet." : "No tasks match."}
        </p>
      ) : (
        <ul className="task-list">
          {visible.map((task) => (
            <li key={task.id} className={task.done ? "task done" : "task"}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
                aria-label={`Mark "${task.title}" as done`}
              />

              <Link to={`/tasks/${task.id}`}>{task.title}</Link>

              <button
                type="button"
                onClick={() => removeTask(task.id)}
                aria-label={`Remove "${task.title}"`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
