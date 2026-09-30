// javascript => typescript
function letterGrade(score: number): string {
  if (score >= 90) {
    return "A";
  }

  return "F";
}

// Uncomment during explanation:
console.log(letterGrade(95));

// TypeScript Error:
// letterGrade("ninety");

function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

console.log(calculateTotal(100, 3));


// let score: number = 92;
// let studentName: string = "Sara";
let passed: boolean = true;

// console.log(score);
// console.log(studentName);
// console.log(passed);

let age = 20;
//age = "hello";

// const firstName: string = "Sara";
// const lastName: string = "Ahmed";

// const fullName = `${firstName} ${lastName}`;

// console.log(fullName);


const studentName = "Omar";
const score = 85;

const message = `${studentName} scored ${score}`;

console.log(message);


const ageNew: number = 25;
const price: number = 99.99;
const salary: number = 15_000;

console.log(ageNew);
console.log(price);
console.log(salary);


const result1 = 0.1 + 0.2;
const result2 = 10 / 0;
const result3 = Number("hello");

console.log(result1);
console.log(result2);
console.log(result3);



const isLoggedIn: boolean = true;

if (isLoggedIn) {
  // console.log("Welcome");
} else {
  // console.log("Please login");
}

// bigInt
const hugeNumber: bigint = 9007199254740993n;

const nextNumber = hugeNumber + 1n;

console.log(hugeNumber);
console.log(nextNumber);

//symbol
const id1: symbol = Symbol("id");
const id2: symbol = Symbol("id");

console.log(id1 === id2);

//null undefined
let nickname: string | null = null;

console.log(nickname);

nickname = "Saqly";

console.log(nickname);


//undefined
let middleName: string | undefined;
console.log(middleName);
middleName = "Ahmed";
console.log(middleName);

//Array
const scores: number[] = [92, 68, 79];

const names: string[] = [
  "Sara",
  "Omar",
  "Ahmed"
];

console.log(scores);
console.log(names);

const namesNew: Array<string> = [
  "Sara",
  "Omar"
];

// console.log(namesNew);
// Array => push => type

// const scores: number[] = [92, 68, 79, 55, 88];

// const doubled = scores.map((score) => {
//   return score * 2;
// });

// const passed = scores.filter((score) => {
//   return score >= 60;
// });

// const total = scores.reduce((sum, score) => {
//   return sum + score;
// }, 0);

// console.log(doubled);
// console.log(passed);
// console.log(total);


// Union Type
const values: (string | number)[] = [
  "Sara",
  92,
  "Omar",
  85
];

// console.log(values);


const grades: readonly string[] = [
  "A",
  "B",
  "C",
  "D",
  "F"
];

// console.log(grades);


// tuples
// const student: [string, number] = [
//   "Sara",
//   92
// ];

// console.log(student);
// destructing
const student: [string, number] = [
  "Sara",
  92
];

const [studentNameTest, studentScore] = student;

console.log(studentNameTest);
console.log(studentScore);

//named tuple
type Point = [
  x: number,
  y: number,
  label?: string
];

const home: Point = [3, 4];

const shop: Point = [
  10,
  2,
  "Shop"
];

// console.log(home);
// console.log(shop);


// tuple function 
function minMax(
  values: number[]
): [min: number, max: number] {

  const minimum = Math.min(...values);
  const maximum = Math.max(...values);

  return [minimum, maximum];
}

const [minimum, maximum] = minMax([
  92,
  68,
  79,
  95
]);

console.log(minimum);
console.log(maximum);

// object 
const studentObj: {
  name: string;
  score: number;
  email?: string;
} = {
  name: "Sara",
  score: 92,
  email : "email@mail.com"
};

console.log(studentObj);

//nested object 
const course: {
  title: string;

  teacher: {
    name: string;
    github?: string;
  };

  students: {
    name: string;
    score: number;
  }[];
} = {

  title: "JavaScript Everywhere",

  teacher: {
    name: "Mostafa"
  },

  students: [
    {
      name: "Sara",
      score: 92
    },
    {
      name: "Omar",
      score: 85
    }
  ]
};

console.log(course);
console.log(course.teacher.name);
console.log(course.students);


// void 
function printStudent(name: string): void {
  console.log(`Student: ${name}`);
}

printStudent("Sara");
// never
function fail(message: string): never {
  throw new Error(message);
}

// Uncomment carefully:
// fail("Something went wrong");

//any
const data: any = {
  name: "Sara"
};

console.log(data.name);

//unknown
// const dataF: unknown = JSON.parse(`
// {
//   "name": "Sara"
// }
// `);
// console.log(dataF.name);
if (
  typeof data === "object" &&
  data !== null &&
  "name" in data
) {

  const student = data as {
    name: string;
  };

  console.log(student.name);
}