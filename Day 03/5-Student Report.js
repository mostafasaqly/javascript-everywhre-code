function isValidScore(score) {
  return (
    typeof score === "number" &&
    !Number.isNaN(score) &&
    score >= 0 &&
    score <= 100
  );
}

function letterGrade(score) {
  if (!isValidScore(score)) return "?";

  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";

  return "F";
}

const isPassing = (
  score,
  passMark = 60
) => score >= passMark;

function average(numbers) {
  if (numbers.length === 0) {
    return 0;
  }

  let total = 0;

  for (const number of numbers) {
    total += number;
  }

  return total / numbers.length;
}

function highest(students) {
  if (students.length === 0) {
    return null;
  }

  let best = students[0];

  for (const student of students) {
    if (student.score > best.score) {
      best = student;
    }
  }

  return best;
}
const students = [
  { name: "Sara", score: 92 },
  { name: "Omar", score: 68 },
  { name: "Lina", score: 79 },
  { name: "Yusuf", score: 95 },
  { name: "Nour", score: 55 },
];
for (const student of students) {
  const grade = letterGrade(student.score);

  const result = isPassing(student.score)
    ? "PASS"
    : "FAIL";

  console.log(
    `${student.name} - ${student.score} - ${grade} - ${result}`
  );
}
const scores = [];

for (const student of students) {
  scores.push(student.score);
}
console.log(scores);
console.log(
  `Top Student: ${highest(students).name}`
);