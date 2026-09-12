function letterGrade(score) {
  if (score >= 90) {
    return "A";
  }

  if (score >= 80) {
    return "B";
  }

  return "C";
}

console.log(letterGrade(95));
console.log(letterGrade(85));
console.log(letterGrade(70));


function greet(name) {
  return `Hello ${name}`;
}

const message = greet("Ali");

console.log(message);


function sayHello() {
  return "Hello";
}

console.log(sayHello);
console.log(sayHello());



function add(a, b) {
  return a + b;
}

console.log(add(10, 20));



function calculatePrice(price, quantity) {
  return price * quantity;
}

const total1 = calculatePrice(100, 3);
const total2 = calculatePrice(50, 5);

console.log(total1);
console.log(total2);



//function defined by varaible
const number = 10;

const text = "Hello";

const calculate = function () {
  return 20;
};
console.log(calculate());

// arrow function 
// const double = (number) => {
//   return number * 2;
// };
const double = (number) => number * 2;
console.log(double(4));

const addNew = (a, b) => a + b;
console.log(addNew(4, 6));

const welcome = () => "Welcome to JavaScript";
console.log(welcome());

const createUser = (name)=> ({name,});
console.log(createUser('Sara'));


// return 
function test() {
  console.log("One");
  return "Finished";
  console.log("Two");
}

console.log(test());


function checkAge(age) {
  if (age < 0) {
    return "Invalid age";
  }

  if (age < 18) {
    return "Not allowed";
  }

  return "Allowed";
}

console.log(checkAge(-5));
console.log(checkAge(15));
console.log(checkAge(25));

// console.log
function add(a, b) {
  return a + b;
}

const result = add(10, 20);

console.log(`Result Value ${result}`);

//exmaple app calculator
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

const multiply = (a, b) => a * b;

const divide = (a, b) => {
  if (b === 0) {
    return "Cannot divide by zero";
  }

  return a / b;
};

console.log(add(10, 5));
console.log(subtract(10, 5));
console.log(multiply(10, 5));
console.log(divide(10, 5));
console.log(divide(10, 0));







