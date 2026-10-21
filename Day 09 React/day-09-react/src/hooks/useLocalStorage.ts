import { useEffect, useState } from "react";

// Reads the saved value once (lazy initial state), then saves on every change.
// `parse` turns the stored text back into a T — or null if it can't be trusted.
export function useLocalStorage<T>(
  key: string,
  fallback: T,
  parse: (raw: string) => T | null,
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : (parse(raw) ?? fallback);
    } catch {
      return fallback; // storage blocked (private mode, browser settings)
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // full or blocked — the app still works, it just won't remember
    }
  }, [key, value]);

  return [value, setValue] as const;
}