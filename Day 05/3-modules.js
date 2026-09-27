// ============================================================
// 1. WHY MODULES?
// ============================================================
// Without modules, developers often copy the same functions into
// many files. A bug fix then has to be repeated everywhere.
//
// A module gives us:
// - private file scope
// - explicit exports
// - explicit imports
// - reusable code
// - clearer dependencies

function localExampleFunction() {
  return "This function is private unless exported";
}

// Uncomment:
// console.log(localExampleFunction());

// ============================================================
// 2. COMMONJS: EXPORTING MULTIPLE VALUES
// ============================================================
// CommonJS is Node.js's original module system.
//
// Example file: grade-lib.js
//
// const PASS_MARK = 60;
//
// function letterGrade(score) {
//   if (score >= 90) return "A";
//   if (score >= 80) return "B";
//   if (score >= 70) return "C";
//   if (score >= 60) return "D";
//   return "F";
// }
//
// function average(numbers) {
//   if (numbers.length === 0) return 0;
//   return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
// }
//
// module.exports = {
//   PASS_MARK,
//   letterGrade,
//   average,
// };

// ============================================================
// 3. COMMONJS: IMPORTING WITH require()
// ============================================================
// Example consumer file:
//
// const {
//   PASS_MARK,
//   letterGrade,
//   average,
// } = require("./grade-lib");
//
// console.log(PASS_MARK);
// console.log(letterGrade(92));
// console.log(average([90, 80]));

// ============================================================
// 4. COMMONJS: EXPORTING ONE MAIN THING
// ============================================================
// Example: delay.js
//
// module.exports = (ms) =>
//   new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
//
// Consumer:
//
// const delay = require("./delay");
//
// delay(1000).then(() => {
//   console.log("Finished");
// });

// ============================================================
// 5. THE exports = {...} TRAP
// ============================================================
// "exports" initially points to the same object as module.exports.
//
// This works:
// exports.hello = () => "Hello";
//
// This DOES NOT replace module.exports:
// exports = {
//   hello: () => "Hello",
// };
//
// Reassigning exports only changes the local variable.
//
// Safer rule:
// module.exports = {
//   hello,
// };

// ============================================================
// 6. COMMONJS MODULE CACHE
// ============================================================
// Node executes a CommonJS module the first time it is required.
// Later require() calls normally reuse the cached result.
//
// Example:
//
// // grade-lib.js
// console.log("[grade-lib] loading");
//
// // report.js
// const first = require("./grade-lib");
// const second = require("./grade-lib");
//
// console.log(first === second);
//
// Expected:
// "[grade-lib] loading" appears once.
// first === second is true.

// ============================================================
// 7. ES MODULES: NAMED EXPORTS
// ============================================================
// ESM is the official JavaScript module standard.
//
// Example file: grade-lib.js
//
// export const PASS_MARK = 60;
//
// export function letterGrade(score) {
//   if (score >= 90) return "A";
//   if (score >= 80) return "B";
//   if (score >= 70) return "C";
//   if (score >= 60) return "D";
//   return "F";
// }
//
// export function average(numbers) {
//   if (numbers.length === 0) return 0;
//   return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
// }
//
// function secretHelper() {
//   return "Private because it is not exported";
// }

// ============================================================
// 8. ES MODULES: NAMED IMPORTS
// ============================================================
// The imported names must match the exported names.
//
import {
  PASS_MARK,
  letterGrade,
  average
} from "./grade-lib.js";
//
console.log(PASS_MARK);
console.log(letterGrade(92));
console.log(average([90, 80]));

// ============================================================
// 9. RENAMING A NAMED IMPORT
// ============================================================
//
// import {
//   average as mean,
// } from "./grade-lib.js";
//
// console.log(mean([90, 80]));

// ============================================================
// 10. NAMESPACE IMPORT
// ============================================================
// Import every named export into one namespace object.
//
// import * as grades from "./grade-lib.js";
//
// console.log(grades.PASS_MARK);
// console.log(grades.letterGrade(92));

// ============================================================
// 11. DEFAULT EXPORT
// ============================================================
// A module may have one default export.
//
// Example file: db.js
//
// export default async function getAttendance(id) {
//   return 60 + id * 7;
// }
//
// Consumer:
//
// import getAttendance from "./db.js";
//
// The importer can choose another local name:
//
// import fetchAttendance from "./db.js";

// ============================================================
// 12. DEFAULT + NAMED EXPORTS TOGETHER
// ============================================================
// db.js:
//
// const delay = (ms) =>
//   new Promise((resolve) => setTimeout(resolve, ms));
//
// export default async function getAttendance(id) {
//   await delay(100);
//   return 60 + id * 7;
// }
//
// export {
//   delay,
// };
//
// Consumer:
//
// import getAttendance, {
//   delay,
// } from "./db.js";

// ============================================================
// 13. DYNAMIC IMPORT
// ============================================================
// Static import must be at the top level.
// Dynamic import() can be used later and returns a Promise.
//
// async function loadGradesWhenNeeded() {
//   const {
//     letterGrade,
//   } = await import("./grade-lib.js");
//
//   console.log(letterGrade(72));
// }
//
// loadGradesWhenNeeded();

// ============================================================
// 14. ENABLING ESM IN NODE
// ============================================================
// Option 1: package.json
//
// {
//   "name": "day-05",
//   "type": "module"
// }
//
// Option 2:
// Rename an ESM file from .js to .mjs.
//
// .cjs explicitly means CommonJS.

// ============================================================
// 15. FILE EXTENSIONS IN NODE ESM
// ============================================================
// Relative ESM imports should include the file extension.
//
// Correct:
// import { average } from "./lib/grade-lib.js";
//
// Wrong:
// import { average } from "./lib/grade-lib";

// ============================================================
// 16. NODE BUILT-IN MODULES WITH ESM
// ============================================================
// The node: prefix makes it clear that this is a Node built-in.
//
// import {
//   readFile,
// } from "node:fs/promises";
//
// const text = await readFile("students.json", "utf8");
//
// console.log(text);

// ============================================================
// 17. TOP-LEVEL AWAIT
// ============================================================
// ESM supports await at the top level.
//
// import {
//   readFile,
// } from "node:fs/promises";
//
// const text = await readFile("students.json", "utf8");
//
// console.log(text);

// ============================================================
// 18. __dirname VS import.meta
// ============================================================
// CommonJS:
//
// console.log(__dirname);
//
// ESM:
//
// console.log(import.meta.dirname);
// console.log(import.meta.filename);
//
// A portable URL relative to the current module:
//
// const studentsUrl = new URL("./students.json", import.meta.url);

// ============================================================
// 19. LIVE BINDINGS IN ESM
// ============================================================
// ESM named imports are live bindings.
//
// counter.js:
//
// export let count = 0;
//
// export function increment() {
//   count++;
// }
//
// app.js:
//
// import {
//   count,
//   increment,
// } from "./counter.js";
//
// increment();
// increment();
//
// console.log(count); // 2
//
// The importer cannot directly assign:
// count = 10; // Error

// ============================================================
// 20. COMMONJS VALUE COPY EXAMPLE
// ============================================================
// counter.cjs:
//
// let count = 0;
//
// function increment() {
//   count++;
// }
//
// module.exports = {
//   count,
//   increment,
// };
//
// app.cjs:
//
// const {
//   count,
//   increment,
// } = require("./counter.cjs");
//
// increment();
// increment();
//
// console.log(count); // still 0 in this destructured value

// ============================================================
// 21. MODULES IN THE BROWSER
// ============================================================
// HTML:
//
// <script type="module" src="./main.js"></script>
//
// main.js:
//
// import {
//   letterGrade,
// } from "./lib/grade-lib.js";
//
// console.log(letterGrade(92));
//
// Browser modules:
// - have module scope
// - support import/export
// - are deferred automatically
// - should be served through a web server such as Live Server

// ============================================================
// 22. WHY INLINE onclick CAN FAIL WITH MODULES
// ============================================================
// Module variables/functions do not automatically become window
// properties.
//
// Avoid:
//
// <button onclick="handleAdd()">Add</button>
//
// Prefer:
//
// const button = document.getElementById("add");
//
// function handleAdd() {
//   // ...
// }
//
// button.addEventListener("click", handleAdd);

// ============================================================
// 23. BARREL FILES
// ============================================================
// A barrel file provides one import point for a folder.
//
// lib/index.js:
//
// export * from "./grade-lib.js";
// export {
//   default as getAttendance,
//   delay,
// } from "./db.js";
//
// Consumer:
//
// import {
//   average,
//   letterGrade,
//   getAttendance,
// } from "./lib/index.js";

// ============================================================
// 24. PROJECT STRUCTURE
// ============================================================
//
// day-05/
// ├── package.json
// ├── students.json
// ├── report.js
// └── lib/
//     ├── index.js
//     ├── grade-lib.js
//     └── db.js
//
// Suggested responsibilities:
// - grade-lib.js -> pure grading functions
// - db.js        -> async data access
// - index.js     -> re-exports
// - report.js    -> application/program logic

// ============================================================
// 25. NPM PACKAGES ARE MODULES TOO
// ============================================================
// Package import: no ./ prefix.
//
// import dayjs from "dayjs";
//
// console.log(dayjs().format("YYYY-MM-DD"));
//
// Relative import: starts with ./ or ../
//
// import {
//   average,
// } from "./lib/grade-lib.js";

// ============================================================
// 26. COMMONJS VS ESM QUICK REFERENCE
// ============================================================
//
// COMMONJS:
// module.exports = { a, b };
// const { a, b } = require("./file");
//
// ESM:
// export function a() {}
// export const b = 1;
// import { a, b } from "./file.js";
//
// COMMONJS:
// - traditional Node.js module system
// - require() is a function
// - __dirname exists
//
// ESM:
// - JavaScript standard
// - works in Node and browsers
// - supports top-level await
// - uses import.meta instead of __dirname
// - relative imports use explicit file extensions in Node

// ============================================================
// 27. SMALL RUNNABLE LOCAL DEMO
// ============================================================
// This section does not use import/export so the teaching file
// itself can safely run as a normal .js file.

const teachingGrades = {
  PASS_MARK: 60,

  letterGrade(score) {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  },

  average(numbers) {
    if (numbers.length === 0) return 0;
    return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
  },
};

function localModulesDemo() {
  const scores = [92, 68, 79];

  const avg = teachingGrades.average(scores);

  // console.log(`Average: ${avg.toFixed(1)}`);
  // console.log(`Grade: ${teachingGrades.letterGrade(avg)}`);
}

// Uncomment:
// localModulesDemo();

// ============================================================
// END OF PART 3
// ============================================================
// Main ideas:
// - modules prevent copy/paste duplication
// - CommonJS uses require/module.exports
// - ESM uses import/export
// - named vs default exports
// - dynamic import()
// - ESM in Node with "type": "module"
// - browser modules
// - module scope and caching
// - barrel files and scalable project structure
