import type { Task } from "../types/task";
interface TaskCardProps {
  task : Task
  variant? : 'default' | 'urgent'
  isSelected? : boolean
  onSelect: (id:number)=>void
  onToggle: (id:number)=>void
  onDelete: (id:number)=>void
}

function getStatusLabel(status: string): string {
  if (status === "todo") return "To Do";
  if (status === "in-progress") return "In Progress";
  return "Done";
}
function TaskCard({ task, variant= 'default',isSelected=false, onSelect, onToggle, onDelete }: TaskCardProps) {
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
        <button type="button" className="task-button" onClick={ ()=>onToggle(task.id)}>
          {isDone? 'Undo': 'Mark Done'}
        </button>
        <button type="button" className="task-button" onClick={ ()=>onSelect(task.id)}>Details</button>
        <button type="button" className="task-button task-button-danger" onClick={ ()=>onDelete(task.id)}>Delete</button>
      </div>
    </article>
  );
}
export default TaskCard;
