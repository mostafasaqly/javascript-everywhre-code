import { NavLink, Outlet } from "react-router";

export function Layout() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Board</h1>
        <nav aria-label="Main">
          <NavLink to="/" end>Tasks</NavLink>
          <NavLink to="/tasks/new">New task</NavLink>
        </nav>
      </header>
      <div>
        <Outlet />
      </div>
    </div>
  );
}