const courseName = "JavaScript Everywhere";

const passMark = 70;

const students = [
  { name: "Sara", score: 92 },
  { name: "Omar", score: 68 },
  { name: "Lina", score: 79 },
  { name: "Yusuf", score: 95 },
  { name: "Nour", score: 55 },
];

let excellent = 0;
let good = 0;
let needsWork = 0;
let total = 0;

console.log(`${courseName} - Student Report`);

console.log("-----------------------------");

for (const student of students) {

  total += student.score;

  let band;

  if (student.score >= 90) {

    band = "Excellent";
    excellent++;

  } else if (student.score >= passMark) {

    band = "Good";
    good++;

  } else {

    band = "Needs Work";
    needsWork++;

  }

  const result =
    student.score >= passMark
      ? "PASS"
      : "FAIL";

  console.log(
    `${student.name} | ${student.score} | ${result} | ${band}`
  );
}

const average =
  total / students.length;

console.log("-----------------------------");

console.log(
  `Average: ${average.toFixed(1)}`
);

console.log(
  `Excellent: ${excellent}`
);

console.log(
  `Good: ${good}`
);

console.log(
  `Needs Work: ${needsWork}`
);