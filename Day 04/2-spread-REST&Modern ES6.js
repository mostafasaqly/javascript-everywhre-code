// ============================================================
// PART 2 — SPREAD, REST & MODERN ES6+ FEATURES
// ============================================================


// ------------------------------------------------------------
// 1. Destructuring in Function Parameters
// ------------------------------------------------------------

function describeStudent({
  name,
  score = 0,
  city = "Unknown"
} = {}) {
  return `${name ?? "Unknown"} scored ${score} in ${city}`;
}

const parameterStudent = {
  name: "Sara",
  score: 92,
  city: "Cairo"
};

// console.log(describeStudent(parameterStudent));
// console.log(describeStudent({ name: "Omar", score: 68 }));
// console.log(describeStudent());


// ------------------------------------------------------------
// 2. Spread with Arrays
// ------------------------------------------------------------

const frontendTechnologies = [
  "HTML",
  "CSS",
  "JavaScript"
];

const backendTechnologies = [
  "Node.js",
  "SQL"
];

const fullStackTechnologies = [
  ...frontendTechnologies,
  ...backendTechnologies
];

const frontendWithAngular = [
  ...frontendTechnologies,
  "Angular"
];

// console.log(fullStackTechnologies);
// console.log(frontendTechnologies);
// console.log(frontendWithAngular);


// ------------------------------------------------------------
// 3. Reference vs Copy
// ------------------------------------------------------------

const originalArray = [
  "HTML",
  "CSS"
];

const arrayAlias = originalArray;
const arrayCopy = [...originalArray];

// Uncomment these lines together to demonstrate the reference problem.

// arrayAlias.push("JavaScript");
// console.log(originalArray);
// console.log(arrayAlias);


// Uncomment these lines together to demonstrate a real array copy.

// arrayCopy.push("TypeScript");
// console.log(originalArray);
// console.log(arrayCopy);


// ------------------------------------------------------------
// 4. Spread with Objects
// ------------------------------------------------------------

const spreadStudent = {
  name: "Sara",
  score: 90
};

const updatedSpreadStudent = {
  ...spreadStudent,
  score: 95
};

const studentWithCity = {
  ...spreadStudent,
  city: "Cairo"
};

// console.log(spreadStudent);
// console.log(updatedSpreadStudent);
// console.log(studentWithCity);


// ------------------------------------------------------------
// 5. Merge Objects
// ------------------------------------------------------------

const defaultSettings = {
  passMark: 60,
  showAttendance: true
};

const customSettings = {
  passMark: 85
};

const finalSettings = {
  ...defaultSettings,
  ...customSettings
};

// The property on the right wins when keys are duplicated.

// console.log(finalSettings);


// ------------------------------------------------------------
// 6. Spread into Function Arguments
// ------------------------------------------------------------

function sumThreeNumbers(a, b, c) {
  return a + b + c;
}

const threeNumbers = [10, 20, 30];

// console.log(sumThreeNumbers(...threeNumbers));
// console.log(Math.max(...[92, 68, 95]));


// ------------------------------------------------------------
// 7. Shallow Copy
// ------------------------------------------------------------

const nestedOriginalStudent = {
  name: "Sara",
  grades: {
    midterm: 90,
    final: 94
  }
};
const shallowStudentCopy = {
  ...nestedOriginalStudent
};


// Uncomment these lines together to show shallow-copy behavior.

shallowStudentCopy.name = "Omar";
shallowStudentCopy.grades.midterm = 0;
// console.log(nestedOriginalStudent.name);
// console.log(nestedOriginalStudent.grades.midterm);


// Copy the nested level too when it must be independent.

const saferStudentCopy = {
  ...nestedOriginalStudent,
  grades: {
    ...nestedOriginalStudent.grades
  }
};

// Uncomment these lines together.

saferStudentCopy.grades.midterm = 50;
// console.log(nestedOriginalStudent.grades.midterm);
// console.log(saferStudentCopy.grades.midterm);


// ------------------------------------------------------------
// 8. Rest vs Spread
// ------------------------------------------------------------

function collectTechnologies(
  first,
  ...others
) {
  return {
    first,
    others
  };
}

const collectedTechnologies =
  collectTechnologies(
    "HTML",
    "CSS",
    "JavaScript",
    "Angular"
  );

// REST collects multiple values into one array.

// console.log(collectedTechnologies);


// SPREAD expands one array into separate values.

// console.log(...frontendTechnologies);


// ------------------------------------------------------------
// 9. Optional Chaining
// ------------------------------------------------------------

const studentWithAddress = {
  name: "Ahmed",
  address: {
    city: "Cairo"
  }
};

const studentWithoutAddress = {
  name: "Omar"
};

// console.log(studentWithAddress.address?.city);
// console.log(studentWithoutAddress.address?.city);


// Optional chaining can be used across a longer path.

// console.log(studentWithoutAddress?.address?.city);


// ------------------------------------------------------------
// 10. Nullish Coalescing
// ------------------------------------------------------------

const zeroScore = 0;

// OR treats 0 as falsy.

// console.log(zeroScore || 100);


// Nullish coalescing only uses the fallback for null or undefined.

// console.log(zeroScore ?? 100);


const safeCity =
  studentWithoutAddress?.address?.city
  ?? "Data";

// console.log(safeCity);


// ------------------------------------------------------------
// 11. Object Shorthand
// ------------------------------------------------------------

const shorthandName = "Ahmed";
const shorthandScore = 90;

const shorthandStudent = {
  name: shorthandName,
  score: shorthandScore
};

const betterShorthandName = "Sara";
const betterShorthandScore = 95;

const shorthandExample = {
  betterShorthandName,
  betterShorthandScore
};

// console.log(shorthandStudent);
// console.log(shorthandExample);


// ------------------------------------------------------------
// 12. Computed Property Names
// ------------------------------------------------------------

const dynamicField = "score";
const dynamicValue = 92;

const dynamicRecord = {
  [dynamicField]: dynamicValue
};

// console.log(dynamicRecord);


// ------------------------------------------------------------
// 13. Object.entries with Destructuring
// ------------------------------------------------------------

const gradeCounts = {
  A: 2,
  B: 1,
  C: 3
};

function runEntriesDemo() {
  for (const [
    grade,
    count
  ] of Object.entries(gradeCounts)) {
    console.log(`${grade}: ${count}`);
  }
}

// runEntriesDemo();


// ------------------------------------------------------------
// 14. Complete Part 2 Example
// ------------------------------------------------------------

const part2Students = [
  {
    id: 1,
    name: "Sara",
    score: 92,
    address: {
      city: "Cairo"
    }
  },
  {
    id: 2,
    name: "Omar",
    score: 68
  }
];

function addBonus(
  {
    score,
    ...student
  },
  bonus = 5
) {
  return {
    ...student,
    score: Math.min(
      score + bonus,
      100
    )
  };
}

function runPart2Demo() {
  for (const student of part2Students) {
    const updatedStudent =
      addBonus(student);

    const city =
      student?.address?.city
      ?? "Unknown";

    console.log(
      `${updatedStudent.name} - ${updatedStudent.score} - ${city}`
    );
  }
}

runPart2Demo();
