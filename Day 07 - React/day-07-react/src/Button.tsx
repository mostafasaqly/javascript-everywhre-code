interface ButtonProps {
  id: number;
}

export function Button({ id }: ButtonProps) {
  function removeTask(id: number) {
  console.log(id);
}

  return (
    <button onClick={() => removeTask(id)}>
      Click Me
    </button>
  );
}