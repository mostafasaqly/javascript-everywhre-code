import type { Filter } from "../types";

const FILTERS: Filter[] = ["all", "open", "done"];

interface FilterBarProps {
  filter: Filter;

  onFilterChange: (filter: Filter) => void;

  search: string;

  onSearchChange: (search: string) => void;
}

export function FilterBar({
  filter,
  onFilterChange,
  search,
  onSearchChange,
}: FilterBarProps) {
  return (
    <section>
      <div>
        {FILTERS.map((currentFilter) => (
          <button
            key={currentFilter}
            onClick={() => onFilterChange(currentFilter)}
            aria-pressed={filter === currentFilter}
          >
            {currentFilter}
          </button>
        ))}
      </div>

      <input
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search tasks..."
      />
    </section>
  );
}
