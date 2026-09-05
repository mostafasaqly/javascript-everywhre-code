const students = [
  {
    name: "Ahmed",
    score: 95,
  },
  {
    name: "Sara",
    score: 80,
  },
  {
    name: "Omar",
    score: 45,
  },
  {
    name: "Mona",
    score: 70,
  },
];

let passedStudents = 0;
let failedStudents = 0;

for (const student of students) {
  let result;

  if (student.score >= 50) {
    result = "PASS";
    passedStudents++;
  } else {
    result = "FAIL";
    failedStudents++;
  }

  console.log(
    `${student.name} - ${student.score} - ${result}`
  );
}

console.log("------------------");

console.log(
  `Total Students: ${students.length}`
);

console.log(
  `Passed: ${passedStudents}`
);

console.log(
  `Failed: ${failedStudents}`
);