import { useState } from "react";
import "./forms.css";

export function Controls() {
  // Each input has its own state
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");
  const [color, setColor] = useState("teal");
  const [subscribed, setSubscribed] = useState(false);
  const [size, setSize] = useState("m");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <label className="field">
        Text
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>

      <label className="field">
        Notes
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
      </label>

      <label className="field">
        Colour
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          <option value="teal">Teal</option>
          <option value="amber">Amber</option>
          <option value="rose">Rose</option>
        </select>
      </label>

      <label className="check">
        <input
          type="checkbox"
          checked={subscribed}
          onChange={(e) => setSubscribed(e.target.checked)}
        />
        Subscribe
      </label>

      <fieldset className="fieldset">
        <legend>Size</legend>

        <div className="radio-group">
          {["s", "m", "l"].map((s) => (
            <label key={s} className="radio">
              <input
                type="radio"
                name="size"
                value={s}
                checked={size === s}
                onChange={(e) => setSize(e.target.value)}
              />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="field">
        Age
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </label>

      <label className="field">
        Date
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <pre className="output">
        {JSON.stringify(
          { text, notes, color, subscribed, size, age, date },
          null,
          2
        )}
      </pre>
    </form>
  );
}
