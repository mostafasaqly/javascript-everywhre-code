import type { Filter, Task } from "./types";

export function visibleTasks(
  tasks: Task[],
  filter: Filter,
  search: string,
): Task[] {
  const query = search.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesFilter =
      filter === "all" || (filter === "done" ? task.done : !task.done);

    const matchesSearch =
      query === "" || task.title.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });
}

export function nextId(tasks: Task[]): number {
  return tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;
}
