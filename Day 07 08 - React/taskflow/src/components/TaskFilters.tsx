import type { ChangeEvent } from "react";
import type { TaskStatus } from "../types/task";

export type StatusFilter = "all" | TaskStatus;
interface TaskFiltersProps {
  query: string;
  status: StatusFilter;
  onQueryChange: (query: string) => void;
  onStatusChange: (status: StatusFilter) => void;
}
function TaskFilters({
  query,
  status,
  onQueryChange,
  onStatusChange,
}: TaskFiltersProps) {
  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    onQueryChange(event.target.value);
  }
  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    onStatusChange(event.target.value as StatusFilter);
  }
  return (
    <div className="task-filters">
      <input
        type="search"
        className="filter-input"
        placeholder="Search tasks..."
        aria-label="Seach tasks"
        value={query}
        onChange={handleQueryChange}
      />
      <select
        className="filter-select"
        aria-label="filter by status"
        value={status}
        onChange={handleStatusChange}
      >
        <option value="all">All Status</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value='done'>Done</option>
      </select>
    </div>
  );
}
export default TaskFilters;
