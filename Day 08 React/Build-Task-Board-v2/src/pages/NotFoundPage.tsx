
import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <>
      <h2>404 — Page Not Found</h2>

      <p>The page you requested does not exist.</p>

      <Link to="/">Go to the task list</Link>
    </>
  );
}
