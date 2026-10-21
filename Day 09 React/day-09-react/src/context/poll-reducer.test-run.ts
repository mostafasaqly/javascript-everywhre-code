// Run with:  node src/context/poll-reducer.test-run.ts
import { INITIAL_POLL, pollReducer } from "./poll-reducer.ts";

const s1 = pollReducer(INITIAL_POLL, { type: "voted", option: "React" });
console.log(s1.votes.React, s1.myVote); // 1 React
const s2 = pollReducer(s1, { type: "voted", option: "Vue" });
console.log(s2 === s1); // true — second vote ignored
console.log(INITIAL_POLL.votes.React); // 0 — nothing was mutated
console.log(pollReducer(s2, { type: "reset" }) === INITIAL_POLL); // true