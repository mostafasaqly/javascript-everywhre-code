import { useState } from "react";

interface Profile {
  name: string;
  city: string;
}

export function Stateful() {
  const [profile, setProfile] =
    useState<Profile>({
      name: "Sara",
      city: "Cairo",
    });

  const [numbers, setNumbers] =
    useState<number[]>([1, 2, 3]);

  function changeCity() {
    setProfile((prev) => ({
      ...prev,
      city: "Alexandria",
    }));
  }

  function changeName() {
    setProfile((prev) => ({
      ...prev,
      name: prev.name.toUpperCase(),
    }));
  }

  function addNumber() {
    setNumbers((prev) => [
      ...prev,
      prev.length + 1,
    ]);
  }

  function removeLastNumber() {
    setNumbers((prev) =>
      prev.slice(0, -1)
    );
  }

  function reverseNumbers() {
    setNumbers((prev) =>
      [...prev].reverse()
    );
  }

  return (
    <section>
      <h2>Objects & Arrays State</h2>

      <h3>Profile</h3>

      <p>
        Name: {profile.name}
      </p>

      <p>
        City: {profile.city}
      </p>

      <button onClick={changeCity}>
        Change City
      </button>

      <button onClick={changeName}>
        Uppercase Name
      </button>

      <hr />

      <h3>Numbers</h3>

      <p>
        {numbers.join(", ")}
      </p>

      <button onClick={addNumber}>
        Add Number
      </button>

      <button onClick={removeLastNumber}>
        Remove Last
      </button>

      <button onClick={reverseNumbers}>
        Reverse
      </button>
    </section>
  );
}