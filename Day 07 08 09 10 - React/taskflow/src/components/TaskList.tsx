import { useState } from "react";
import { tasks as intialtasks } from "../data/tasks";
import Section from "./Section";
import TaskCard from "./TaskCard";
import type { Task, TaskFormValues } from "../types/task";
import TaskForm from "./TaskForm";
import { fromFormValues, toFromValues } from "../utils/taskForm";
import TaskFilters from "./TaskFilters";
import { type StatusFilter } from "./TaskFilters";
function TaskList() {
  // let selectedId: number | null = null;
  const [tasks, setTasks] = useState<Task[]>(intialtasks);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const [editingId, setEditingId] = useState<number | null>(null);

  const selectedTask = tasks.find((task) => task.id === selectedId);
  const openCount = tasks.filter((task) => task.status !== "done").length;
  const doneCount = tasks.length - openCount;

  // logic for filter and search
  const normalizedQuery = query.trim().toLowerCase();
  const visibleTasks = tasks.filter((task) => {
    const matchQuery =
      task.title.toLowerCase().includes(normalizedQuery) ||
      task.description.toLowerCase().includes(normalizedQuery);
    const matchStatus = statusFilter === "all" || task.status === statusFilter;
    return matchQuery && matchStatus;
  });
  const emptyMessage =
    tasks.length === 0
      ? "No Tasks yet, add new task"
      : "No tasks match your filters";

  function handleSelectTask(id: number) {
    setSelectedId(id);
  }
  function handleAdd(values: TaskFormValues) {
    const nextId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const newTask: Task = {
      id: nextId,
      ...fromFormValues(values),
    };
    setTasks([...tasks, newTask]);
  }
  function handleToggleTask(id: number) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const newStatus = task.status === "done" ? "todo" : "done";
          return { ...task, status: newStatus };
        }
        return task;
      }),
    );
  }
  function handleUpdate(id: number, values: TaskFormValues) {
    setTasks(
      tasks.map(
        (task): Task =>
          task.id === id ? 
        { ...task, ...fromFormValues(values) } : task),
      
    )
    setEditingId(null);
  }
  function handleDeleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
    }
  }
  function handleClearDone() {
    setTasks(tasks.filter((task) => task.status !== "done"));
  }

  return (
    <Section title={`My Tasks (${openCount} open, ${doneCount} done)`}>
      <TaskForm submitLabel="Add Task" onSubmit={handleAdd}/>
      <div className="task-toolbar">
        <button
          type="button"
          className="task-button task-button-danger"
          onClick={handleClearDone}
          disabled={doneCount === 0}
        >
          Clear Done ({doneCount})
        </button>
      </div>
      <TaskFilters
        query={query}
        status={statusFilter}
        onQueryChange={setQuery}
        onStatusChange={setStatusFilter}
      />

      <p className="task-selected">
        Selected : {selectedTask?.title ?? "None"}
      </p>
      {visibleTasks.length === 0 ? (
        <p className="empty-state">{emptyMessage}</p>
      ) : (
        visibleTasks.map((task) => task.id === editingId?
        <TaskForm
        key={task.id}
        initialValues={toFromValues(task)}
        submitLabel="Save"
        onSubmit={(values)=> handleUpdate(task.id, values)}
        onCancel={()=> setEditingId(null)}

        />
        :(
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
            onEdit={setEditingId}
          />
        ))
      )}
    </Section>
  );
}

export default TaskList;
