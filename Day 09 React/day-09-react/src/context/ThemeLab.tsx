import { ThemeProvider } from "./ThemeProvider";
import { useTheme } from "./theme-context";

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button onClick={toggle} aria-pressed={theme === "dark"}>
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

function Panel() {
  return (
    <section className="panel">
      <h3>A panel that doesn't know about themes</h3>
      <Badge />
    </section>
  );
}

function Badge() {
  const { theme } = useTheme();
  return <span className="badge">Current theme: {theme}</span>;
}

export function ThemeLab() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <Panel />
    </ThemeProvider>
  );
}