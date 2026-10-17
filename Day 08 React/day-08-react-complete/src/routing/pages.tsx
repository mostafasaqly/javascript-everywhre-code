import { Link, NavLink, Outlet, useParams } from "react-router";

export function Shell() {
  return (
    <div>
      <nav aria-label="Lab">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/about">About</NavLink>

        <NavLink to="/lessons">Lessons</NavLink>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

export function Home() {
  return <h2>Home Page</h2>;
}

export function About() {
  return <h2>About Page</h2>;
}

export function Lessons() {
  return (
    <>
      <h2>Lessons</h2>

      <ul>
        {[1, 2, 3].map((n) => (
          <li key={n}>
            <Link to={`/lessons/${n}`}>Lesson {n}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export function Lesson() {
  const { n } = useParams();

  return (
    <>
      <h2>Lesson {n}</h2>
      <p>Parameter type: {typeof n}</p>
      <Link to="/lessons">Back</Link>
    </>
  );
}

export function NotFound() {
  return <h2>404 — Page Not Found</h2>;
}
