// sayHello();

// function sayHello() {
//   console.log("Hello");
// }

console.log(score);
var score = 90;


// var score;
// console.log(score);
// score = 90;

// console.log(scoreLet);
let scoreLet = 90;// Temporal Dead Zone TDZ


{
  // TDZ starts

//   console.log(age);

  const age = 25;

  // TDZ ends
}
// arrow function => hoisting
// sayHello();

// const sayHello = () => {
//   console.log("Hello");
// };

// sayHelloVar();

// var sayHelloVar = function() {
//   console.log("Hello");
// };

// var sayHelloVar;
// sayHelloVar();
// sayHelloVar = function() {
//   console.log("Hello");
// };
// undefined();


//Closures
function outer() {
  const message = "Hello";

  return function inner() {
    console.log(message);
  };
}

const result = outer();

result();


//counter exmaple
function createCounter() {
  let count = 0;

  return function () {
    count++;

    return count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1());
console.log(counter1());

console.log(counter2());

console.log(counter1());

//ID using clousure
function createIdGenerator(prefix) {
  let id = 0;

  return function () {
    id++;

    return `${prefix}-${id}`;
  };
}

const studentId = createIdGenerator("STU");

console.log(studentId());
console.log(studentId());
console.log(studentId());

//function factory
function createGrader(passMark) {
  return function (score) {
    if (score >= passMark) {
      return "Pass";
    }

    return "Fail";
  };
}
const universityGrader = createGrader(60);
const finalExamGrader = createGrader(70);
const difficultExamGrader = createGrader(85);

console.log(universityGrader(65));
console.log(finalExamGrader(65));
console.log(difficultExamGrader(90));