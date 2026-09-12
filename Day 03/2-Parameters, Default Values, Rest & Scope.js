function greet(name) {
  return `Hello ${name}`;
}

console.log(greet());
// default parameters
function greet(name = "Guest") {
  return `Hello ${name}`;
}

console.log(greet("Ahmed"));
console.log(greet());


function calculateSalary(salary, bonus =0 ) {
  return salary + bonus;
}

console.log(calculateSalary(5000));
console.log(calculateSalary(5000, 1000));


function test(value = 100) {
  console.log(value);
}

test();
test(undefined);
test(null);
test(0);
test("");

function add(a,b)
{
    return a+b;
}
console.log(add(1,2,3,4));

// Rest Paramerts
function showNumbers(...numbers) {
  console.log(numbers);
}

showNumbers(1, 2, 3,4,5);


function sum(...numbers) {
  let total = 0;

  for (const number of numbers) {
    total += number;
  }

  return total;
}

console.log(sum(10, 20));
console.log(sum(10, 20, 30));
console.log(sum(1, 2, 3, 4, 5));



function studentReport(name, ...scores) {
  console.log(name);
  console.log(scores);
}

studentReport("Ahmed", 90, 80, 70);

// Scope
// global scope
const course = "JavaScript Everywhere";

function showCourse() {
  console.log(course);
}

showCourse();
console.log(course);

//function scope
function studentInfo() {
  const name = "Ahmed";

  console.log(name);
}

studentInfo();

// console.log(name);

// block scope
if (true) {
  const name = "Ahmed";
  let age = 25;
}

// console.log(name);
// console.log(age);

// let, const => block scope
for (let i = 0; i < 3; i++) {
  console.log(i);
}

// console.log(i);
///////////////////////////////////var////////////
if (true) {
  var message = "Hello";
}

console.log(message);



// scope chain
const country = "Egypt";

function outer() {
  const city = "Cairo";

  function inner() {
    const street = "Tahrir";

    console.log(country);
    console.log(city);
    console.log(street);
  }

  inner();
}

outer();

//shadowing
const name = "Global Ahmed";

function showName() {
  const name = "Local Mohamed";

  console.log(name);
}

showName();

console.log(name);

// exmaple student statictics
function calculateAverage(...scores) {
  if (scores.length === 0) {
    return 0;
  }

  let total = 0;

  for (const score of scores) {
    total += score;
  }

  return total / scores.length;
}

function getStudentResult(name, passMark = 60, ...scores) {
  const average = calculateAverage(...scores);
  console.log(scores);

  const result = average >= passMark ? "Pass" : "Fail";

  return `${name}: ${average.toFixed(1)} - ${result}`;
}

console.log(
  getStudentResult("Ahmed", 60, 90, 80, 70)
);

console.log(
  getStudentResult("Omar", 60, 40, 50, 45)
);