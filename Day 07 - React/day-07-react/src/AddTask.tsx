import { useState } from "react";
import type { SubmitEvent } from "react";

interface AddTaskProps {
  onAdd: (title: string) => void;
}

export function AddTask({
  onAdd,
}: AddTaskProps) {
  const [title, setTitle] =
    useState("");

  function handleSubmit(
    event: SubmitEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedTitle =
      title.trim();

    if (trimmedTitle === "") {
      return;
    }

    onAdd(trimmedTitle);

    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Task</h2>

      <input
        type="text"
        value={title}
        onChange={(event) =>
          setTitle(
            event.target.value
          )
        }
        placeholder="Enter task title"
      />

      <button type="submit">
        Add Task
      </button>

      <p>
        Current value: {title}
      </p>
    </form>
  );
}