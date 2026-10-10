import { useState } from "react";

import type { SubmitEvent } from "react";

import type { Priority } from "../types";

interface AddTaskFormProps {
  onAdd: (title: string, priority: Priority) => void;
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState("");

  const [priority, setPriority] = useState<Priority>("medium");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (trimmedTitle === "") {
      return;
    }

    onAdd(trimmedTitle, priority);

    setTitle("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="New task..."
      />

      <select
        className="select"
        value={priority}
        onChange={(event) => setPriority(event.target.value as Priority)}
      >
        <option value="low">Low</option>

        <option value="medium">Medium</option>

        <option value="high">High</option>
      </select>

      <button className="btn" type="submit">Add</button>
    </form>
  );
}
