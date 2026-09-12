// functions are values
function sayHello() {
  console.log("Hello");
}

const myFunction = sayHello;

myFunction();

//Callback
function execute(action) {
  action();
}

// function sayHello() {
//   console.log("Hello");
// }

// execute(sayHello);
function sayHello() {
  console.log("Hello");
}

function sayGoodbye() {
  console.log("Goodbye");
}

execute(sayHello);
execute(sayGoodbye);
//
function calculate(a, b, operation) {
  return operation(a, b);
}
const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

console.log(calculate(10, 5, add));
console.log(calculate(10, 5, subtract));
console.log(calculate(10, 5, multiply));
//Anonymous Callback

// const double = (number) => number * 2;
// calculate(5, 2, double);
calculate(5, 2, (a, b) => a * b);

//Array Callback
function applyToAll(numbers, action) {
  const result = [];

  for (const number of numbers) {
    result.push(action(number));
  }

  return result;
}
const squared = applyToAll(
  [1, 2, 3],
  (number) => number * number
);
console.log(squared);
const doubled = applyToAll(
  [1, 2, 3],
  (number) => number * 2
);

console.log(doubled);


//
function handleClick() {
  console.log("Clicked");
}
// button.addEventListener("click", handleClick);

//pure function 
// function add(a, b) {
//   return a + b;
// }
function letterGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";

  return "F";
}
console.log(letterGrade(95));

// Full exmaple Grade Library
// validation 
function isValidScore(score) {
  if (typeof score !== "number") {
    return false;
  }

  if (Number.isNaN(score)) {
    return false;
  }

  return score >= 0 && score <= 100;
}
console.log(isValidScore(90));
console.log(isValidScore(-10));
console.log(isValidScore(150));
console.log(isValidScore("90"));

function letterGrade(score) {
  if (!isValidScore(score)) {
    return "?";
  }

  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";

  return "F";
}
// const isPassing = (score, passMark = 60) => {
//   return score >= passMark;
// };
const isPassing = (score, passMark = 60) => score >= passMark;
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
console.log(
  average([90, 80, 70])
);

function highest(students) {
  if (students.length === 0) {
    return null;
  }
[90, 80, 70 , 95]
  let bestStudent = students[0]; // 90

  for (const student of students) {
    if (student.score > bestStudent.score) {
      bestStudent = student; //95
    }
  }

  return bestStudent;
}
const students = [
  {
    name: "Sara",
    score: 92,
  },
  {
    name: "Omar",
    score: 68,
  },
  {
    name: "Lina",
    score: 79,
  },
  {
    name: "Yusuf",
    score: 95,
  },
];

const topStudent = highest(students);
console.log(topStudent);