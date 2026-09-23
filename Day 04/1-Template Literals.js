const part1Name = "Mostafa";
const part1Score = 90;

const oldMessage =
  "Student " + part1Name + " scored " + part1Score;

const modernMessage =
  `Student ${part1Name} scored ${part1Score}`;

// console.log(oldMessage);
// console.log(modernMessage);


// Template literals can contain expressions.

const templateStudent = {
  name: "Ahmed",
  score: 85
};

// console.log(`Student: ${templateStudent.name}`);
// console.log(`Score: ${templateStudent.score}`);
// console.log(`After bonus: ${templateStudent.score + 5}`);
// console.log(`Result: ${templateStudent.score >= 60 ? "Pass" : "Fail"}`);


// Template literals can span multiple lines.

const studentReport = `
Student Report
--------------
Name: ${templateStudent.name}
Score: ${templateStudent.score}
Result: ${templateStudent.score >= 60 ? "PASS" : "FAIL"}
`;

// console.log(studentReport);


// ------------------------------------------------------------
// 2. Object Destructuring
// ------------------------------------------------------------

const objectStudent = {
  name: "Sara",
  score: 92,
  city: "Cairo"
};

// Old way: access every property through the object.

// console.log(objectStudent.name);
// console.log(objectStudent.score);
// console.log(objectStudent.city);


// Destructuring extracts properties into variables.

const {
  name: objectStudentName,
  score: objectStudentScore,
  city: objectStudentCity
} = objectStudent;

// console.log(objectStudentName);
// console.log(objectStudentScore);
// console.log(objectStudentCity);


// ------------------------------------------------------------
// 3. Renaming and Default Values
// ------------------------------------------------------------

const partialStudent = {
  name: "Omar",
  score: 68
};

const {
  name: partialName,
  score: partialScore,
  city: partialCity = "Unknown",
  attendance: partialAttendance = 0
} = partialStudent;

// console.log(partialName);
// console.log(partialScore);
// console.log(partialCity);
// console.log(partialAttendance);


// A default value is used for undefined, not null.

const studentWithNull = {
  name: "Lina",
  city: null
};

const {
  city: nullCity = "Unknown"
} = studentWithNull;

// console.log(nullCity);


// ------------------------------------------------------------
// 4. Nested Destructuring
// ------------------------------------------------------------

const enrollment = {
  student: {
    name: "Yusuf",
    score: 95
  },
  course: {
    title: "JavaScript Everywhere",
    track: 1
  }
};

const {
  student: {
    name: enrolledStudentName,
    score: enrolledStudentScore
  },
  course: {
    title: enrolledCourseTitle
  }
} = enrollment;

// console.log(enrolledStudentName);
// console.log(enrolledStudentScore);
// console.log(enrolledCourseTitle);


// The parent property is only used as a path here.
// No variable named "student" is created by the nested pattern.

// console.log(student);


// ------------------------------------------------------------
// 5. Object Rest
// ------------------------------------------------------------

const studentForRest = {
  id: 1,
  name: "Ahmed",
  score: 90,
  city: "Cairo"
};

const {
  id: studentId,
  ...studentWithoutId
} = studentForRest;

// console.log(studentId);
// console.log(studentWithoutId);


// ------------------------------------------------------------
// 6. Array Destructuring
// ------------------------------------------------------------

const tracks = [
  "Web",
  "Mobile",
  "Desktop",
  "Backend"
];

const [
  firstTrack,
  secondTrack
] = tracks;

// console.log(firstTrack);
// console.log(secondTrack);


// Skip array positions with commas.

const [
  ,
  ,
  thirdTrack
] = tracks;

// console.log(thirdTrack);


// Array destructuring can use default values.

const technologiesWithMissingValue = [
  "JavaScript"
];

const [
  mainTechnology,
  secondTechnology = "Not Found"
] = technologiesWithMissingValue;

// console.log(mainTechnology);
// console.log(secondTechnology);


// ------------------------------------------------------------
// 7. Array Rest
// ------------------------------------------------------------

const technologiesForRest = [
  "HTML",
  "CSS",
  "JavaScript",
  "Angular",
  "Node.js"
];

const [
  firstTechnology,
  secondTechnologyForRest,
  ...otherTechnologies
] = technologiesForRest;

// console.log(firstTechnology);
// console.log(secondTechnologyForRest);
// console.log(otherTechnologies);


// ------------------------------------------------------------
// 8. Swap Values with Array Destructuring
// ------------------------------------------------------------

let firstValue = "Ahmed";
let secondValue = "Mohamed";

// console.log(firstValue, secondValue);

[
  firstValue,
  secondValue
] = [
  secondValue,
  firstValue
];

// console.log(firstValue, secondValue);


// ------------------------------------------------------------
// 9. Destructuring a Function Return Value
// ------------------------------------------------------------

function findMinMax(numbers) {
  let min = numbers[0];
  let max = numbers[0];

  for (const number of numbers) {
    if (number < min) min = number;
    if (number > max) max = number;
  }

  return [min, max];
}

const [
  minimumScore,
  maximumScore
] = findMinMax([92, 68, 79, 95, 55]);

// console.log(minimumScore);
// console.log(maximumScore);


// ------------------------------------------------------------
// 10. Destructuring Inside a Loop
// ------------------------------------------------------------

const part1Students = [
  {
    name: "Sara",
    score: 92,
    city: "Cairo"
  },
  {
    name: "Omar",
    score: 68,
    city: "Alexandria"
  },
  {
    name: "Lina",
    score: 79
  }
];

function runPart1LoopDemo() {
  for (const {
    name,
    score,
    city = "Unknown"
  } of part1Students) {
    const result =
      score >= 60 ? "PASS" : "FAIL";

    console.log(
      `${name} - ${score} - ${city} - ${result}`
    );
  }
}

runPart1LoopDemo();

