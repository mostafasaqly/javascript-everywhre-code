// Run with:  node src/board.test-run.ts
import { boardReducer, nextId } from "./board-reducer.ts";
import { parseTasks } from "./storage.ts";
import { INITIAL } from "./initial-tasks.ts";

const added = boardReducer(INITIAL, {
  type: "added",
  task: { id: nextId(INITIAL), title: "New", done: false, priority: "low", dueDate: "", notes: "" },
});
console.log(added.length, INITIAL.length); // 4 3 — new array, INITIAL untouched
console.log(boardReducer(INITIAL, { type: "toggled", id: 2 })[1].done); // true
console.log(INITIAL[1].done); // false — not mutated
console.log(boardReducer(INITIAL, { type: "removed", id: 1 }).map((t) => t.id).join(",")); // 2,3
console.log(nextId([])); // 1

console.log(parseTasks(null)); // null
console.log(parseTasks("{oops")); // null
console.log(parseTasks('{"id":1}')); // null — not an array
console.log(parseTasks("[]")); // []
console.log(parseTasks(JSON.stringify([INITIAL[0], { id: "2" }, null]))?.length); // 1 — bad entries dropped