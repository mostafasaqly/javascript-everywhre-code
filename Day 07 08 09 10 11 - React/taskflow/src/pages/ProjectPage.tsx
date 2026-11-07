import { useParams } from "react-router";
import { projects } from "../data/projects";
import TaskList from "../components/TaskList";
import EmptyState from "../components/ui/EmptyState";

function ProjectPage() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);
  if (!project) {
    return (
      <EmptyState title="Project Not Found" message="Pick a different project." />
    );
  }
  return <TaskList key={project.id} title={project.name}
  projectId={project.id} />;
}
export default ProjectPage;
