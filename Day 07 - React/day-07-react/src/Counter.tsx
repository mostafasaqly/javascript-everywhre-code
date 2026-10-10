import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  function increase() {
    setCount((prev) => prev + 1);
  }

  function decrease() {
    setCount((prev) => prev - 1);
  }

  function reset() {
    setCount(0);
  }

  function increaseThreeTimes() {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  }

  return (
    <section>
      <h2>Counter Example</h2>
      <h3>Count: {count}</h3>
      <button onClick={decrease}>
        -
      </button>

      <button onClick={increase}>
        +
      </button>

      <button onClick={reset}>
        Reset
      </button>

      <button onClick={increaseThreeTimes}>
        +3
      </button>
    </section>
  );
}