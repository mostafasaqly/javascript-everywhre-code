import { memo } from "react";
import type { Task } from "../types/task";
import Button from "./ui/Button";
interface TaskCardProps {
  task : Task
  variant? : 'default' | 'urgent'
  isSelected? : boolean
  onSelect: (id:number)=>void
  onToggle: (id:number)=>void
  onDelete: (id:number)=>void
  onEdit: (id:number) => void
}

function getStatusLabel(status: string): string {
  if (status === "todo") return "To Do";
  if (status === "in-progress") return "In Progress";
  return "Done";
}
function TaskCard({ task, variant= 'default',isSelected=false, 
  onSelect, onToggle, onDelete, onEdit }: TaskCardProps) {
  const isDone = task.status === "done";
  const cardClass = 'task-card task-card-' + variant + (isSelected? 'task-card-selected': '')
  return (
    <article className={cardClass}>
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">
        {task.description}
      </p>
      <p className = "task-date">{task.dueDate ?? 'No Due Date'}</p>
      <span className={`task-status status-${task.status}`}>{getStatusLabel(task.status)}</span>
      <div className="task-actions">
        <Button onClick={ ()=>onToggle(task.id)}>
          {isDone? 'Undo': 'Mark Done'}
        </Button>
        <Button onClick={ ()=>onSelect(task.id)}>Details</Button>
        <Button  onClick={ ()=>onEdit(task.id)}>Edit</Button>
        <Button variant="danger"
          onClick={ ()=>onDelete(task.id)}>Delete</Button>
      </div>
    </article>
  );
}
export default memo(TaskCard);
