import { Link, useSearchParams } from "react-router";
import { useBoard } from "../board-context";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import type { Filter, Priority, Sort, Task } from "../types";

const FILTERS: Filter[] = ["all", "open", "done"];
const SORTS: Sort[] = ["none", "due", "priority"];
const PRIORITY_RANK: Record<Priority, number> = { high: 0, medium: 1, low: 2 };

// The URL is untrusted text → parse it, fall back to a safe default
function parseFilter(raw: string | null): Filter {
  return FILTERS.includes(raw as Filter) ? (raw as Filter) : "all";
}
function parseSort(raw: string | null): Sort {
  return SORTS.includes(raw as Sort) ? (raw as Sort) : "none";
}

function sortTasks(tasks: Task[], sort: Sort): Task[] {
  if (sort === "none") return tasks;
  const copy = [...tasks]; // never sort the original array in place
  if (sort === "priority") {
    copy.sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]);
  } else {
    // tasks without a due date go last
    copy.sort((a, b) => (a.dueDate || "9999").localeCompare(b.dueDate || "9999"));
  }
  return copy;
}

export function TaskListPage() {
  const { tasks, toggleTask, removeTask } = useBoard();
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = parseFilter(searchParams.get("filter"));
  const sort = parseSort(searchParams.get("sort"));
  const q = searchParams.get("q") ?? "";

  const open = tasks.filter((t) => !t.done).length; // derived
  useDocumentTitle(open === 0 ? "Task Board" : `(${open}) Task Board`);

  function setParam(name: string, value: string, defaultValue: string) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value === defaultValue) next.delete(name);
        else next.set(name, value);
        return next;
      },
      { replace: name === "q" }, // typing shouldn't fill the history
    );
  }

  const needle = q.trim().toLowerCase();
  const visible = sortTasks(
    tasks.filter((t) => {
      if (filter === "open" && t.done) return false;
      if (filter === "done" && !t.done) return false;
      return needle === "" || t.title.toLowerCase().includes(needle);
    }),
    sort,
  );

  return (
    <section>
      <div className="page-head">
        <h2>Tasks</h2>
        <p className="hint">
          {open} open · {tasks.length - open} done
        </p>
      </div>

      <div className="toolbar">
        <div className="segmented" role="group" aria-label="Filter">
          {FILTERS.map((f) => (
            <button key={f} aria-pressed={filter === f} onClick={() => setParam("filter", f, "all")}>
              {f}
            </button>
          ))}
        </div>

        <input
          type="search"
          placeholder="Search tasks…"
          aria-label="Search tasks"
          value={q}
          onChange={(e) => setParam("q", e.target.value, "")}
        />

        <select
          aria-label="Sort"
          value={sort}
          onChange={(e) => setParam("sort", e.target.value, "none")}
        >
          <option value="none">No sorting</option>
          <option value="due">By due date</option>
          <option value="priority">By priority</option>
        </select>
      </div>

      {visible.length === 0 ? (
        <p className="empty">
          {tasks.length === 0 ? (
            <>No tasks yet. <Link to="/tasks/new">Add the first one</Link>.</>
          ) : (
            "No tasks match."
          )}
        </p>
      ) : (
        <ul className="task-list">
          {visible.map((task) => (
            <li key={task.id} className={task.done ? "task done" : "task"}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
                aria-label={`Mark “${task.title}” as ${task.done ? "open" : "done"}`}
              />
              <Link to={`/tasks/${task.id}`} className="task-title">
                {task.title}
              </Link>
              <span className={`priority priority-${task.priority}`}>{task.priority}</span>
              {task.dueDate && <span className="due">{task.dueDate}</span>}
              <button
                className="icon danger"
                onClick={() => removeTask(task.id)}
                aria-label={`Delete “${task.title}”`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}