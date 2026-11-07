import LoadingState from "../components/LoadingState";
import Section from "../components/Section";
import StatCard from "../components/StatCard";
import { projects } from "../data/projects";
import { useTasksContext } from "../state/tasksContext";

function DahsboardPage() {
  const { tasks, status } = useTasksContext();
  if (status === "loading") {
    return <LoadingState />;
  }
  const today = new Date().toISOString().split("T")[0];
  const done = tasks.filter((task) => task.status === "done").length;
  const overdue = tasks.filter(
    (task) =>
      task.status !== "done" &&
      task.dueDate !== undefined &&
      task.dueDate < today,
  ).length;
  const percent = tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 0;

  return (
    <Section title='dashboard'>
        <div className="stat-grid">
            <StatCard label='Total Tasks' value={tasks.length} />
            <StatCard label='Completed' value={done} hint={`${percent}%`} tone={percent > 50 ? "default" : "danger"} />
            <StatCard label='Overdue' value={overdue} tone={overdue > 0 ? "danger" : "default"} />
        </div>
        <h3 className="dashboard-subtitle">By Projects</h3>
        <ul className='project-stats'>
            {projects.map((project)=>{
                const count = tasks.filter((task) => task.projectId === project.id).length;
                return (
                    <li key={project.id} className='project-stat'>
                        <span className='project-name'>{project.name}</span>
                        <span className='project-count'>{count}</span>
                    </li>
                )
            })}
        </ul>
    </Section>
  )
}

export default DahsboardPage;
