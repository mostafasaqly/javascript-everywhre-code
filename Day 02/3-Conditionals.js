const score = 75;

if (score >= 90) {
  console.log("Excellent");
} else if (score >= 70) {
  console.log("Good");
} else if (score >= 50) {
  console.log("Pass");
} else {
  console.log("Fail");
}


const age = 25;
const hasPaid = true;
const isBlocked = false;

if (age >= 18 && hasPaid && !isBlocked) {
  console.log("Welcome to the course");
} else {
  console.log("Cannot register");
}

//ternarty operator
//let result;

// if (score >= 70) {
//   result = "Pass";
// } else {
//   result = "Fail";
// }
const result = score >= 70 ? "Pass" : "Fail";


const ageStart = 20;
const status = ageStart >= 18 ? "Adult" : "Minor";


const band =
  score >= 90
    ? "A"
    : score >= 70
      ? "B"
      : "C";


const track = "mobile";

switch (track) {
  case "web":
    console.log("React");
    break;

  case "mobile":
    console.log("React Native");
    break;

  case "desktop":
    console.log("Electron");
    break;

  default:
    console.log("Unknown track");
}

//switch 
const role = "admin";

switch (role) {
  case "admin":
    console.log("Admin Dashboard");
    break;
  case "student":
    console.log("Student Dashboard");
    break;
}
//sull exmaple 
const studentName = "Ahmed";
const scoreNew = 85;
const attendanceNew = 90;
const isBlockedNew = false;

let resultNew;

if (isBlockedNew) {
  resultNew = "Blocked";
} else if (scoreNew >= 70 && attendanceNew >= 75) {
  resultNew = "Pass";
} else {
  resultNew = "Fail";
}

console.log(`${studentName}: ${resultNew}`);