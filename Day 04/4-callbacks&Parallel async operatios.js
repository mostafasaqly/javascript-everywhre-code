// ============================================================
// PART 4 — CALLBACKS, ERRORS & PARALLEL ASYNC OPERATIONS
// ============================================================


// ------------------------------------------------------------
// 1. Synchronous Callback
// ------------------------------------------------------------

function calculateDouble(
  number,
  callback
) {
  const result =
    number * 2;

  callback(result);
}

function runSyncCallbackDemo() {
  calculateDouble(
    5,
    (result) => {
      console.log(result);
    }
  );

  console.log("Done");
}

// runSyncCallbackDemo();


// ------------------------------------------------------------
// 2. Asynchronous Callback
// ------------------------------------------------------------

function runAsyncCallbackDemo() {
  setTimeout(() => {
    console.log("Timer");
  }, 0);

  console.log("Done");
}

// runAsyncCallbackDemo();


// ------------------------------------------------------------
// 3. Why Returning from an Async Callback Does Not Work
// ------------------------------------------------------------

function getScoreWrong() {
  setTimeout(() => {
    return 92;
  }, 100);
}

function runWrongReturnDemo() {
  const score =
    getScoreWrong();

  console.log(score);
}

// Expected result: undefined.
// runWrongReturnDemo();


// ------------------------------------------------------------
// 4. Correct Callback Solution
// ------------------------------------------------------------

function getScoreLater(callback) {
  setTimeout(() => {
    callback(92);
  }, 1500);
}

function runCallbackSolutionDemo() {
  getScoreLater(
    (score) => {
      console.log(
        `Got score: ${score}`
      );
    }
  );
}

// runCallbackSolutionDemo();


// ------------------------------------------------------------
// 5. Fake Database
// ------------------------------------------------------------

const STUDENTS = {
  1: {
    id: 1,
    name: "Sara",
    courseId: 10
  },
  2: {
    id: 2,
    name: "Omar",
    courseId: 10
  },
  3: {
    id: 3,
    name: "Lina",
    courseId: 20
  }
};

const SCORES = {
  1: [92, 88, 95],
  2: [68, 71],
  3: [79]
};

const COURSES = {
  10: {
    id: 10,
    title: "JavaScript Everywhere"
  },
  20: {
    id: 20,
    title: "TypeScript Basics"
  }
};

const LATENCY = {
  1: 300,
  2: 100,
  3: 200
};


// ------------------------------------------------------------
// 6. Error-First Callback
// ------------------------------------------------------------

function getStudent(
  id,
  callback
) {
  setTimeout(() => {
    const student =
      STUDENTS[id];

    if (!student) {
      return callback(
        new Error(
          `No student with id ${id}`
        )
      );
    }

    callback(
      null,
      student
    );
  }, LATENCY[id] ?? 50);
}

function getScores(
  studentId,
  callback
) {
  setTimeout(() => {
    const scores =
      SCORES[studentId];

    if (!scores) {
      return callback(
        new Error(
          `No scores for student ${studentId}`
        )
      );
    }

    callback(
      null,
      scores
    );
  }, 100);
}

function getCourse(
  courseId,
  callback
) {
  setTimeout(() => {
    const course =
      COURSES[courseId];

    if (!course) {
      return callback(
        new Error(
          `No course with id ${courseId}`
        )
      );
    }

    callback(
      null,
      course
    );
  }, 100);
}

function average(numbers) {
  if (numbers.length === 0) {
    return 0;
  }

  let total = 0;

  for (const number of numbers) {
    total += number;
  }

  return total / numbers.length;
}


// Successful error-first callback example.

function runSuccessfulStudentDemo() {
  getStudent(
    1,
    (err, student) => {
      if (err) {
        return console.log(
          `Failed: ${err.message}`
        );
      }

      console.log(
        `Found: ${student.name}`
      );
    }
  );
}

// runSuccessfulStudentDemo();


// Failed error-first callback example.

function runFailedStudentDemo() {
  getStudent(
    99,
    (err, student) => {
      if (err) {
        return console.log(
          `Failed: ${err.message}`
        );
      }

      console.log(
        `Found: ${student.name}`
      );
    }
  );
}

// runFailedStudentDemo();


// ------------------------------------------------------------
// 7. Callback Hell
// ------------------------------------------------------------

function runCallbackHellDemo() {
  getStudent(
    1,
    (err, student) => {
      if (err) {
        return console.log(
          `Failed: ${err.message}`
        );
      }

      getScores(
        student.id,
        (err, scores) => {
          if (err) {
            return console.log(
              `Failed: ${err.message}`
            );
          }

          getCourse(
            student.courseId,
            (err, course) => {
              if (err) {
                return console.log(
                  `Failed: ${err.message}`
                );
              }

              console.log(
                `${student.name} - ${course.title} - avg ${average(scores).toFixed(1)}`
              );
            }
          );
        }
      );
    }
  );
}

// runCallbackHellDemo();


// ------------------------------------------------------------
// 8. Flatten the Callback Chain with Named Functions
// ------------------------------------------------------------

function buildReport(
  id,
  done
) {
  getStudent(
    id,
    (err, student) => {
      if (err) {
        return done(err);
      }

      addScores(
        student,
        done
      );
    }
  );
}

function addScores(
  student,
  done
) {
  getScores(
    student.id,
    (err, scores) => {
      if (err) {
        return done(err);
      }

      addCourse(
        {
          ...student,
          scores
        },
        done
      );
    }
  );
}

function addCourse(
  student,
  done
) {
  getCourse(
    student.courseId,
    (err, course) => {
      if (err) {
        return done(err);
      }

      done(
        null,
        {
          ...student,
          course: course.title
        }
      );
    }
  );
}

function printReport(
  err,
  report
) {
  if (err) {
    return console.log(
      `Error: ${err.message}`
    );
  }

  const {
    name,
    course,
    scores
  } = report;

  console.log(
    `${name} - ${course} - avg ${average(scores).toFixed(1)}`
  );
}

// buildReport(1, printReport);
// buildReport(99, printReport);


// ------------------------------------------------------------
// 9. Parallel Async Operations
// ------------------------------------------------------------

function loadAll(
  ids,
  done
) {
  const results = [];
  let finished = 0;

  if (ids.length === 0) {
    return done([]);
  }

  ids.forEach(
    (id, index) => {
      buildReport(
        id,
        (err, report) => {
          // console.log(`Arrived: id ${id}`);

          results[index] =
            err
              ? {
                  id,
                  error: err.message
                }
              : report;

          finished++;

          if (
            finished === ids.length
          ) {
            done(results);
          }
        }
      );
    }
  );
}

function runParallelDemo() {
  const started =
    Date.now();

  loadAll(
    [1, 2, 3, 42],
    (results) => {
      console.log(
        `All ${results.length} requests finished in ${Date.now() - started}ms`
      );

      for (
        const result
        of results
      ) {
        if (result.error) {
          console.log(
            `Error ${result.id}: ${result.error}`
          );

          continue;
        }

        console.log(
          `${result.name} - ${average(result.scores).toFixed(1)} - ${result.course}`
        );
      }
    }
  );
}

// runParallelDemo();


// ------------------------------------------------------------
// 10. Real Node.js Async File Reading
// ------------------------------------------------------------

// Create a students.json file next to this JavaScript file:
//
// [
//   { "name": "Sara", "score": 92 },
//   { "name": "Omar", "score": 68 },
//   { "name": "Lina", "score": 79 }
// ]

const fs = require("fs");

function runFileReadDemo() {
  console.log("Before readFile");

  fs.readFile(
    "students.json",
    "utf8",
    (err, text) => {
      if (err) {
        return console.log(
          `Failed: ${err.code}`
        );
      }

      const students =
        JSON.parse(text);

      console.log(
        `Loaded ${students.length} students`
      );

      for (const {
        name,
        score
      } of students) {
        console.log(
          `${name}: ${score}`
        );
      }
    }
  );

  console.log(
    "After readFile - file is still loading"
  );
}

// runFileReadDemo();


// ------------------------------------------------------------
// 11. Complete Lecture Example
// ------------------------------------------------------------

const FINAL_STUDENTS = {
  1: {
    id: 1,
    name: "Sara",
    score: 92,
    address: {
      city: "Cairo"
    }
  },
  2: {
    id: 2,
    name: "Omar",
    score: 68
  }
};

function fetchFinalStudent(
  id,
  callback
) {
  setTimeout(() => {
    const student =
      FINAL_STUDENTS[id];

    if (!student) {
      return callback(
        new Error(
          `Student ${id} not found`
        )
      );
    }

    callback(
      null,
      {
        ...student
      }
    );
  }, 1000);
}

function printFinalStudent(
  err,
  student
) {
  if (err) {
    return console.log(
      `Error: ${err.message}`
    );
  }

  const {
    name,
    score,
    address
  } = student;

  const city =
    address?.city
    ?? "Unknown";

  const result =
    score >= 60
      ? "PASS"
      : "FAIL";

  console.log(`
Student Report
--------------
Name: ${name}
Score: ${score}
City: ${city}
Result: ${result}
  `);
}

function runFinalLectureDemo() {
  console.log(
    "Application Started"
  );

  fetchFinalStudent(
    1,
    printFinalStudent
  );

  fetchFinalStudent(
    2,
    printFinalStudent
  );

  fetchFinalStudent(
    100,
    printFinalStudent
  );

  console.log(
    "All requests sent"
  );
}

runFinalLectureDemo();
