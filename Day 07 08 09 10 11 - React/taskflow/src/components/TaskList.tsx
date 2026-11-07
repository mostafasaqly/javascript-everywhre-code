import { useCallback, useEffect, useMemo, useState } from "react";
import Section from "./Section";
import TaskCard from "./TaskCard";
import type { TaskFormValues } from "../types/task";
import TaskForm from "./TaskForm";
import {  toFromValues } from "../utils/taskForm";
import TaskFilters from "./TaskFilters";
import { type StatusFilter } from "./TaskFilters";
import {  writeJson } from "../utils/storage";
import { type TaskApi } from "../hooks/useTasks";
import {DEFAULT_PROJECT_ID} from "../data/projects";
import { useOutletContext } from "react-router";
import EmptyState from "./ui/EmptyState";
import Button from "./ui/Button";
interface TaskListProps {
  title: string;
  projectId: string;
}
function TaskList({ title, projectId }: TaskListProps) {
  const {tasks : allTasks, addTask, updateTask, toggleTask, deleteTask, clearDone} = 
  useOutletContext<TaskApi>();

  const tasks = useMemo( ()=> (projectId ? allTasks.filter((task) => task.projectId === projectId) : allTasks), 
  [allTasks, projectId]);

  // let selectedId: number | null = null;
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const [editingId, setEditingId] = useState<number | null>(null);

  const selectedTask = tasks.find((task) => task.id === selectedId);
  const openCount = tasks.filter((task) => task.status !== "done").length;
  const doneCount = tasks.length - openCount;

  // logic for filter and search
  const normalizedQuery = query.trim().toLowerCase();
    const visibleTasks = useMemo(() => {
      return tasks.filter((task) => {
        const matchQuery =
          task.title.toLowerCase().includes(normalizedQuery) ||
          task.description.toLowerCase().includes(normalizedQuery);
        const matchStatus = statusFilter === "all" || task.status === statusFilter;
        return matchQuery && matchStatus;})
    },[tasks, query, statusFilter]);
  

  useEffect(() => {
    writeJson("taskflow.tasks", tasks);
  }, [tasks]);
  useEffect(() => {
    document.title = openCount > 0 ? `(${openCount}) My Tasks` : "My Tasks";
  }, [openCount]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        console.log("Escape key pressed");
        alert("Escape key pressed");
        setEditingId(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  
  
  function handleUpdate(id: number, values: TaskFormValues) {
    updateTask(id, values);
    setEditingId(null);
  }
  const handleDeleteTask = useCallback((id: number) => {
    deleteTask(id);
    setSelectedId((current) => (current === id ? null : current));
  }, [deleteTask]);
  

  return (
    <Section title={title + '(' + openCount + ')'}>
      <TaskForm submitLabel="Add Task" onSubmit={(values) => addTask(values, projectId ?? DEFAULT_PROJECT_ID)} />

      <div className="task-toolbar">
        <Button
          onClick={clearDone}
          disabled={doneCount === 0}
        >
          Clear Done ({doneCount})
        </Button>
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
        <EmptyState title="No Tasks Found" />
      ) : (
        visibleTasks.map((task) =>
          task.id === editingId ? (
            <TaskForm
              key={task.id}
              initialValues={toFromValues(task)}
              submitLabel="Save"
              onSubmit={(values) => handleUpdate(task.id, values)}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <TaskCard
              key={task.id}
              task={task}
              variant={
                task.dueDate && task.status !== "done" ? "urgent" : "default"
              }
              isSelected={task.id === selectedId}
              onSelect={setSelectedId}
              onToggle={toggleTask}
              onDelete={handleDeleteTask}
              onEdit={setEditingId}
            />
          ),
        )
      )}
    </Section>
  );
}

export default TaskList;
