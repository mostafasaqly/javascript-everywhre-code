for (let i = 0; i < 5; i++) {
  console.log(i);
}

// const students = [
//   "Ahmed",
//   "Sara",
//   "Omar",
// ];

// for (let i = 0; i < students.length; i++) {
//   console.log(students[i]);
// }

// const students = [
//   "Ahmed",
//   "Sara",
//   "Omar",
// ];

// for (const student of students) {
//   console.log(student);
// }

const students = [
  {
    name: "Ahmed",
    score: 90,
  },
  {
    name: "Sara",
    score: 80,
  },
  {
    name: "Omar",
    score: 60,
  },
];

for (const student of students) {
  console.log(student.name);
  console.log(student.score);
}

//for .. in
const student = {
  name: "Sara",
  score: 92,
  city: "Cairo",
};

for (const key in student) {
//   console.log(key);
console.log(`${key}: ${student[key]}`);
}

//while loop
let countdown = 3;

while (countdown > 0) {
  console.log(countdown);

  countdown--;
}

console.log("Go!");

// do while loop
let attempts = 0;

do {
  attempts++;

  console.log(attempts);

} while (attempts < 3);


// continue and break
const scores = [80, 40, 85, 95];

for (const score of scores) {

  if (score === 40) {
    break; // continue
  }

  console.log(score);
}


// foreach
const tracks = [
  "Web",
  "Mobile",
  "Desktop",
];

tracks.forEach((track, index) => {
  console.log(`${index + 1}. ${track}`);
});

// full exmaple
const courseName = "JavaScript Everywhere";
const passMark = 70;

const studentsNew = [
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
for (const student of studentsNew) {

  total += student.score;

}
const average = total / studentsNew.length;


for (const student of studentsNew) {

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

}

const result =
  student.score >= passMark
    ? "PASS"
    : "FAIL";