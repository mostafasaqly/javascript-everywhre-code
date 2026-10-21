import { useLocalStorage } from "../hooks/useLocalStorage";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

function parseText(raw: string): string | null {
  try {
    const data: unknown = JSON.parse(raw);
    return typeof data === "string" ? data : null;
  } catch {
    return null;
  }
}

export function NotesPad() {
  const [text, setText] = useLocalStorage("notes-pad", "", parseText);
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length; // derived

  useDocumentTitle(`${words} words · Notes`);

  return (
    <>
      <label htmlFor="notes">Notes</label>
      <textarea id="notes" rows={8} value={text} onChange={(e) => setText(e.target.value)} />
      <p className="hint">{words} words — saved in this browser</p>
    </>
  );
}