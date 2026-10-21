import { useCallback, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ThemeContext } from "./theme-context";
import type { Theme } from "./theme-context";

function parseTheme(raw: string): Theme | null {
  return raw === '"light"' || raw === '"dark"' ? (JSON.parse(raw) as Theme) : null;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "light", parseTheme);

  // <html> lives outside React's tree → syncing it is an effect
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === "light" ? "dark" : "light")), [setTheme]);
  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

  return <ThemeContext value={value}>{children}</ThemeContext>;
}