//function
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(10, 20));
const result:number = add (1,2);
console.log(result);

function getGrade(score: number): string {
  if (score >= 90) {
    return "A";
  }

  if (score >= 80) {
    return "B";
  }

  if (score >= 70) {
    return "C";
  }

  if (score >= 60) {
    return "D";
  }

  return "F";
}

// console.log(getGrade(95));
// console.log(getGrade(82));
// console.log(getGrade(55));

//optional parameter
function greet(
  name: string,
  title?: string
): string {

  if (title) {
    return `Hello ${title} ${name}`;
  }

  return `Hello ${name}`;
}

console.log(greet("Sara"));
console.log(greet("Sara", "Dr."));

//defualt values
function calculatePrice(
  price: number,
  quantity: number = 1
): number {
  return price * quantity;
}

console.log(calculatePrice(100));
console.log(calculatePrice(100, 3));

//reset parameter
function calculateTotal(
  ...prices: number[]
): number {

  return prices.reduce(
    (total, price) => total + price,
    0
  );
}

console.log(calculateTotal(10, 20));
console.log(calculateTotal(10, 20, 30, 40));

//arrow function 
const subtract = (
  a: number,
  b: number
): number => {
  return a - b;
};

// console.log(subtract(10, 4));
const square = (value: number): number => value * value;

// console.log(square(5));

//callback function 
function calculate(
  a: number,
  b: number,
  operation: (x: number, y: number) => number
): number {

  return operation(a, b);
}
const addTest = (
  a: number,
  b: number
): number => a + b;

const multiply = (
  a: number,
  b: number
): number => a * b;
// console.log(calculate(10, 5, addTest));
// console.log(calculate(10, 5, multiply));

// Object 
const student: {
  id: number;
  name: string;
  score: number;
} = {
  id: 1,
  name: "Sara",
  score: 92
};

// console.log(student);
//type
type Student = {
  id: number;
  name: string;
  score: number;
  email?: string;
};
const student1: Student = {
  id: 1,
  name: "Sara",
  score: 92
};

const student2: Student = {
  id: 2,
  name: "Omar",
  score: 85,
  email: "omar@example.com"
};
student1.id= 100;
console.log(student1.id);
// console.log(student2);


type StudentWithReadONly = {
  readonly id: number;
  name: string;
  score: number;
};

const studentWithRead: StudentWithReadONly = {
  id: 1,
  name: "Sara",
  score: 92
};

// interface
interface StudentInterface {
  id: number; // readonly 
  name: string;
  score: number;
  // optional
}
const studentInt: StudentInterface = {
  id: 1,
  name: "Sara",
  score: 92
};

// console.log(studentInt);


interface Person {
  id: number;
  name: string;
  email: string;
}
interface StudentInhi extends Person {
  score: number;
}
interface Teacher extends Person {
  subject: string;
}
const StudentInhi: StudentInhi = {
  id: 1,
  name: "Sara",
  email: "sara@example.com",
  score: 92
};

const teacher: Teacher = {
  id: 2,
  name: "Mostafa",
  email: "mostafa@example.com",
  subject: "JavaScript"
};

// console.log(student);
// console.log(teacher);

// union type
type Status =
  | "pending"
  | "completed"
  | "cancelled";

let userId :string | number;

// union function 
function printId(
  id: string | number
): void {

  console.log(`ID: ${id}`);
}

printId(100);
printId("USER-100");

//example

type TaskStatus =
  | "todo"
  | "in-progress"
  | "completed";

interface Task {
  readonly id: number;
  title: string;
  description?: string;
  status: TaskStatus;
}
const task: Task = {
  id: 1,
  title: "Learn TypeScript",
  status: "todo"
};
task.status = "completed";
console.log(task);

const tasks: Task[] = [
  {
    id: 1,
    title: "Learn TypeScript",
    status: "completed"
  },
  {
    id: 2,
    title: "Learn Fetch API",
    status: "in-progress"
  },
  {
    id: 3,
    title: "Build Task Manager",
    status: "todo"
  }
];

console.log(tasks);

function printTask(task: Task): void {
  console.log(`${task.id} - ${task.title}`);
  console.log(`Status: ${task.status}`);
}
printTask(tasks[0]);
printTask(tasks[1]);
printTask(tasks[2]);

function createTask(
  id: number,
  title: string
): Task {

  return {
    id,
    title,
    status: "todo"
  };
}

const newTask = createTask(
  4,
  "Learn Generics"
);

console.log(newTask);

function formatId(
  id: string | number
): string {

  if (typeof id === "string") {
    return id.toUpperCase();
  }

  return id.toString();
}

// console.log(formatId("user-100"));
// console.log(formatId(100));

//Genrics
// function firstNumber(
//   items: number[]
// ): number | undefined {
//   return items[0];
// }
// function firstString(
//   items: string[]
// ): string | undefined {
//   return items[0];
// }
function first<T>(
  items: T[]
): T | undefined {

  return items[0];
}
const firstScore = first<number>([
  92,
  85,
  70
]);

// console.log(firstScore);
const firstName = first<string>([
  "Sara",
  "Omar",
  "Ahmed"
]);

// console.log(firstName);

// type generics
// const score = first([
//   92,
//   85,
//   70
// ]);

// const name = first([
//   "Sara",
//   "Omar",
//   "Ahmed"
// ]);

// console.log(score);
// console.log(name);

function identity<T>(value: T): T {
  return value;
}
const userValue = identity({
  id: 1,
  name: "Sara"
});

// console.log(userValue);

interface ApiResponse<T> {
  success: boolean;
  data: T;
}
interface StudentApi {
  id: number;
  name: string;
  score: number;
}
// const response: ApiResponse<StudentApi> = {
//   success: true,

//   data: {
//     id: 1,
//     name: "Sara",
//     score: 92
//   }
// };

// console.log(response);
// console.log(response.data.name);

const response: ApiResponse<StudentApi[]> = {
  success: true,

  data: [
    {
      id: 1,
      name: "Sara",
      score: 92
    },
    {
      id: 2,
      name: "Omar",
      score: 85
    }
  ]
};

// console.log(response);
// console.log(response.data);

// exmaple task manager
type TaskStatusTask =
  | "todo"
  | "in-progress"
  | "completed";

interface Task {
  readonly id: number;
  title: string;
  description?: string;
  status: TaskStatus;
}

const tasksNew: Task[] = [];
function addTask(
  id: number,
  title: string,
  description?: string
): Task {

  const task: Task = {
    id,
    title,
    description,
    status: "todo"
  };

  tasks.push(task);

  return task;
}
// CRUD => Create, Read, Update, Delete
function updateTaskStatus(
  id: number,
  status: TaskStatus
): void {

  const task = tasks.find(
    (task) => task.id === id
  );

  if (!task) {
    return;
  }

  task.status = status;
}

function getTaskById(
  id: number
): Task | undefined {

  return tasks.find(
    (task) => task.id === id
  );
}
addTask(
  1,
  "Learn TypeScript"
);

addTask(
  2,
  "Learn Fetch API",
  "Practice GET and POST requests"
);

console.log(tasks);
updateTaskStatus(
  1,
  "in-progress"
);

console.log(tasks);

const selectedTask = getTaskById(100);

console.log(selectedTask);