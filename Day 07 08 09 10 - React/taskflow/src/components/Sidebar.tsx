import { NavLink } from "react-router";
import { projects } from "../data/projects";
function linkClass({ isActive }: { isActive: boolean }) {
  return isActive ? "project-item active" : "project-item";
}
function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <h2 className="sidebar-title">Projects</h2>
        <ul className="project-list">
          <li>
            <NavLink to="/" end className={linkClass}>All Tasks</NavLink>
          </li>
          {projects.map((project) => (
            <li key={project.id}>
              <NavLink
                to={`/projects/${project.id}`}
                className={linkClass}
              >
                {project.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
export default Sidebar;
