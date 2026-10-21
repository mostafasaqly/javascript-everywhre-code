import { useState } from "react";
import { Clock } from "./effects/Clock";
import { Stopwatch } from "./effects/Stopwatch";
import { NotesPad } from "./effects/NotesPad";
import { UserLookup } from "./effects/UserLookup";
import { ThemeLab } from "./context/ThemeLab";
import { PollLab } from "./context/PollLab";

const LABS = {
  clock: { label: "Clock", el: <Clock /> },
  stopwatch: { label: "Stopwatch", el: <Stopwatch /> },
  notes: { label: "Notes pad", el: <NotesPad /> },
  user: { label: "User lookup", el: <UserLookup /> },
  theme: { label: "Theme", el: <ThemeLab /> },
   poll: { label: "Poll", el: <PollLab /> },
};
type LabId = keyof typeof LABS;

export default function App() {
  const [lab, setLab] = useState<LabId>("clock");
  return (
    <div className="app">
      <header className="app-header">
        <h1>Day 09 Labs</h1>
        <nav>
          {(Object.keys(LABS) as LabId[]).map((id) => (
            <button
              key={id}
              aria-pressed={lab === id}
              onClick={() => setLab(id)}
            >
              {LABS[id].label}
            </button>
          ))}
        </nav>
      </header>
      <main>{LABS[lab].el}</main>
    </div>
  );
}
