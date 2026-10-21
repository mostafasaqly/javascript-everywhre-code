import { useReducer } from "react";
import { INITIAL_POLL, OPTIONS, pollReducer } from "./poll-reducer";

export function PollLab() {
  const [poll, dispatch] = useReducer(pollReducer, INITIAL_POLL);
  const total = OPTIONS.reduce((sum, o) => sum + poll.votes[o], 0); // derived

  return (
    <>
      <h3>Which framework is this course using?</h3>
      <div className="row">
        {OPTIONS.map((o) => (
          <button
            key={o}
            disabled={poll.myVote !== null}
            aria-pressed={poll.myVote === o}
            onClick={() => dispatch({ type: "voted", option: o })}
          >
            {o} — {poll.votes[o]}
          </button>
        ))}
      </div>
      <p>{total} vote{total === 1 ? "" : "s"}</p>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </>
  );
}