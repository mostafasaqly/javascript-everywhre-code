console.log("Hello, World!");
//variables 
console.log("mostafa");
const fullName = "mostafa";
console.log(fullName);


const courseName = "JavaScript Everywhere";
// courseName = "JavaScript for Beginners"; // This will throw an error because courseName is a constant
let sessionNumber = 2;
var oldVariable = "old javascript variable";
// console.log(courseName);

let score = 50;
console.log(score);
score = 75;
console.log(score);



let cartTotal = 0;
cartTotal = cartTotal + 100;
cartTotal = cartTotal + 50;
console.log(cartTotal);


const student = {
    name : "mostafa",
    age : 25
}
student.age = 26;
console.log(student.name);
console.log(student.age);

student.city = "Cairo";
console.log(student.city);


// student = {
//     name : "Ahmed",
//     age : 30
// } // This will throw an error because student is a constant and cannot be reassigned
// console.log(student.name);


// Array
const courses = ["JavaScript"];
courses[0] = "React";
courses.push("Angular");
// courses = [];
console.log(courses);


// naming varaibles camelCaseNaming

const studentName = "Ahmed";
const studentAge = 25;
const totalPrice = 500;
const courseDuration = 6;

const isActive = true;
const isLoggedIn = false;
const hasPermission = true;
const canEdit = false;


const MAX_ATTEMPTS = 3;
const API_URL = "https://example.com";

// javascript = 7 types primitives
const name = 'Mostafa';
const course = `JavaScript Everywhere`;

const firstName = "Mostafa";

console.log(`Hello ${firstName}`);

//Number
const age = 30;
const price = 19.99;
const temperature = -5;
// Boolean
const isLoggedInNew = true;
const hasPermissionNew = false;
//Undefined
let userName;
console.log(userName); // Output: undefined
//Null
let selectedCourse = null;
console.log(selectedCourse); // Output: null

//BigInt
const bigNumber = 9007199254740993n;

//Symbol
const uniqueId = Symbol('id');
//Object 
const person = {
    name: 'Mostafa',
    age: 30,
    isStudent: true
};
//Array
const numbers = [1, 2, 3, 4, 5];
const arrayUsers = [{ name: 'Mostafa', age: 30 }, { name: 'Ahmed', age: 25 }];


console.log(typeof name); // Output: string
console.log(typeof age); // Output: number
console.log(typeof price); // Output: number
console.log(typeof temperature); // Output: number
console.log(typeof isLoggedInNew); // Output: boolean
console.log(typeof hasPermissionNew); // Output: boolean
console.log(typeof userName); // Output: undefined
console.log(typeof selectedCourse); // Output: object
console.log(typeof bigNumber); // Output: bigint
console.log(typeof uniqueId); // Output: symbol
console.log(typeof person); // Output: object
console.log(typeof numbers); // Output: object
console.log(typeof arrayUsers); // Output: object


let isNumbersArray = Array.isArray(numbers); // Output: true
console.log(isNumbersArray);

// full exmaple
const studentNameNew = "Ahmed";
let studentScore = 70;
const isActiveNew = true;
const coursesNew = ["JavaScript", "HTML"];

studentScore = 85;

coursesNew.push("CSS");

console.log(studentNameNew);
console.log(studentScore);
console.log(coursesNew);

console.log(typeof studentNameNew);
console.log(typeof studentScore);
console.log(typeof isActiveNew);

console.log(Array.isArray(coursesNew));

