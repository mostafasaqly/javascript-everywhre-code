import { useState } from "react";
import type { SubmitEvent } from "react";
import { pretendToSave } from "./fakeApi";

export function Saving() {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState<string[]>([]);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (submitting) return;
    if (title.trim() === "") return;

    setError("");
    setSubmitting(true);

    try {
      await pretendToSave(title);

      setSaved((prev) => [...prev, title.trim()]);
      setTitle("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title (type "fail" to see an error)</label>

      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={submitting}
      />

      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}

      <button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : "Save"}
      </button>

      <ul>
        {saved.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </form>
  );
}
