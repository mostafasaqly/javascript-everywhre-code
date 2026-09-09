console.log('5' + 3); // Output: '53' (string concatenation)
console.log('5' - 3); // Output: 2 (numeric subtraction)
console.log("5" * "2"); // Output: 10 (numeric multiplication)
console.log("5" / "2"); // Output: 2.5 (numeric division)


const value = "50";
const numberValue = Number(value); // Explicit conversion from string to number
console.log(numberValue);

console.log(Number("5") + 3);


const age = 25;
const ageString = String(age);
console.log(typeof ageString);


const width = "200px";
console.log(parseInt(width));

const price = "19.99";
console.log(parseFloat(price));

const result = Number("Hello"); // not a number
console.log(result); // Output: NaN (Not a Number)
console.log(Number.isNaN(result));

// true & false [0, 0n, null, undefined, NaN, ''] are falsy values

if ("0") {
  console.log("Hello");
}
if ([]) {
  console.log("runs");
}

if ({}) {
  console.log("runs");
}


// Operators
//10 + 3;
// 10 - 3;
// 10 * 3;
// 10 / 3;
// 10 % 3;
// 10 ** 3;
console.log(10 ** 3);

const number = 8;
const isEven = number % 2 === 0;
console.log(isEven);

let score = 10;
score += 5;

score++;
score--;

let studentsCount = 0;

studentsCount++;
studentsCount++;
studentsCount++;

console.log(studentsCount);


//comparison operators
// ===
// !==
// >
// <
// >=
// <=
const ageM = 20;

console.log(ageM >= 18);

console.log(5 === "5");

// logical operators
const ageN = 22;
const hasTicket = true;

console.log(ageN >= 18 && hasTicket);// true


const isAdmin = false;
const isManager = true;

console.log(isAdmin || isManager);// true


const isLoggedIn = true;
console.log(!isLoggedIn);


let scoreTest =200 ;
console.log(scoreTest ?? 100);



const user = {};
console.log(user.address?.city);

const student = {
  name: "Ahmed",
  contact: {
    email: "ahmed@test.com",
  },
};

console.log(student.contact?.email);

console.log(student.address?.city);


//full example
const priceTest = "100";
const quantity = 3;

const total = Number(priceTest) * quantity;

console.log(total);

const discount = 20;

const finalPrice = total - discount;

console.log(finalPrice);

const isExpensive = finalPrice >= 200;

console.log(isExpensive);