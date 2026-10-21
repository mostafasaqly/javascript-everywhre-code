import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <section className="not-found">
      <h2>404 — Page not found</h2>
      <p>The page you are looking for doesn't exist.</p>
      <Link to="/">← Back to the tasks</Link>
    </section>
  );
}