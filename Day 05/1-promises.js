// ============================================================
// 1. WHAT IS A PROMISE?
// ============================================================
// A Promise is an object that represents a value that may be
// available now, later, or never if the operation fails.
//
// Promise states:
// 1. pending   -> still waiting
// 2. fulfilled -> completed successfully
// 3. rejected  -> failed
//
// A Promise can settle only once.

//Excutor function
const basicPromise = new Promise((resolve, reject) => {
  const success = true;
 
  if (success) {
    resolve("Operation completed successfully");
  } else {
    reject(new Error("Operation failed"));
  }
});

// Uncomment to demonstrate Promise state/result:
// console.log(basicPromise);

// ============================================================
// 2. CREATING A REUSABLE DELAY PROMISE
// ============================================================
// setTimeout itself does not return a Promise.
// We wrap it inside new Promise so it can be awaited or chained.

const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

// Uncomment:
// delay(1000).then(() => console.log("One second finished"));

// ============================================================
// 3. FAKE DATABASE USED IN THE NEXT EXAMPLES
// ============================================================

const STUDENTS = {
  1: { id: 1, name: "Sara", courseId: 10 },
  2: { id: 2, name: "Omar", courseId: 10 },
  3: { id: 3, name: "Lina", courseId: 20 },
};

const SCORES = {
  1: [92, 88, 95],
  2: [68, 71],
  3: [79],
};

const COURSES = {
  10: { id: 10, title: "JS Everywhere" },
  20: { id: 20, title: "TypeScript Basics" },
};

const LATENCY = {
  1: 300,
  2: 100,
  3: 200,
};

// Generic helper that simulates an asynchronous database lookup.
function lookup(table, id, label, ms = 100) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const row = table[id];

      if (!row) {
        reject(new Error(`No ${label} with id ${id}`));
        return;
      }

      resolve(row);
    }, ms);
  });
}

function getStudent(id) {
  return lookup(STUDENTS, id, "student", LATENCY[id] ?? 50);
}

function getScores(studentId) {
  return lookup(SCORES, studentId, "scores for student", 100);
}

function getCourse(courseId) {
  return lookup(COURSES, courseId, "course", 100);
}

function average(numbers) {
  if (numbers.length === 0) return 0;

  let total = 0;

  for (const number of numbers) {
    total += number;
  }

  return total / numbers.length;
}

// ============================================================
// 4. CONSUMING PROMISES: .then(), .catch(), .finally()
// ============================================================
// .then()    -> runs when the Promise is fulfilled.
// .catch()   -> runs when the Promise is rejected.
// .finally() -> runs in both success and failure cases.

// Uncomment this complete demo:
//
// getStudent(101)
//   .then((student) => {
//     console.log(`Found: ${student.name}`);
//   })
//   .catch((error) => {
//     console.log(`Failed: ${error.message}`);
//   })
//   .finally(() => {
//     console.log("Request finished");
//   });

// ============================================================
// 5. PROMISE CHAINING
// ============================================================
// .then() returns a NEW Promise.
// Returning a value sends that value to the next .then().

// Uncomment:
//
// Promise.resolve(2)
//   .then((number) => number * 10)
//   .then((number) => number + 1)
//   .then((number) => console.log(number));

// ============================================================
// 6. RETURNING ANOTHER PROMISE FROM .then()
// ============================================================
// When a .then() returns a Promise, the chain waits for it.

// Uncomment:
//
// getStudent(1)
//   .then((student) => {
//     return getCourse(student.courseId);
//   })
//   .then((course) => {
//     console.log(course.title);
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

// ============================================================
// 7. THE MISSING RETURN BUG
// ============================================================
// WRONG:
// If braces are used and we forget "return", the next .then()
// receives undefined and does not wait for getScores().

// Uncomment to demonstrate the problem:
//
// getStudent(1)
//   .then((student) => {
//     getScores(student.id);
//   })
//   .then((scores) => {
//     console.log(scores);
//   });

// CORRECT VERSION:
//
// getStudent(1)
//   .then((student) => {
//     return getScores(student.id);
//   })
//   .then((scores) => {
//     console.log(scores);
//   });

// Short correct version with implicit return:
//
// getStudent(1)
//   .then((student) => getScores(student.id))
//   .then((scores) => console.log(scores));

// ============================================================
// 8. ONE .catch() CAN HANDLE THE WHOLE CHAIN
// ============================================================
// A rejection skips the remaining .then() handlers until the
// nearest .catch() is found.

// Uncomment:
//
// getStudent(99)
//   .then((student) => getScores(student.id))
//   .then((scores) => console.log(scores))
//   .catch((error) => console.log(`Caught: ${error.message}`));

// ============================================================
// 9. THROWING INSIDE .then()
// ============================================================
// Throwing an Error inside .then() automatically rejects the
// Promise returned by that .then().

// Uncomment:
//
// getStudent(2)
//   .then((student) => {
//     if (student.id === 1) {
//       throw new Error("Demo error inside .then()");
//     }
//     console.log(student.name);
//     return student;
//   })
//   .catch((error) => console.log(error.message));

// ============================================================
// 10. RECOVERING FROM AN ERROR
// ============================================================
// A .catch() may return a fallback value.
// The chain becomes fulfilled again after that return.

// Uncomment:
//
// getStudent(99)
//   .catch(() => {
//     return { id: 0, name: "Guest", courseId: null };
//   })
//   .then((student) => {
//     console.log(`Hello Test , ${student.name}`);
//   });

// ============================================================
// 11. PROMISIFYING A CALLBACK FUNCTION
// ============================================================
// Older Node.js APIs often use error-first callbacks:
// callback(error, value)
//
// We can wrap such a function in a Promise.

function getStudentCallback(id, callback) {
  setTimeout(() => {
    if (id !== 1) {
      callback(new Error(`No student with id ${id}`));
      return;
    }

    callback(null, { id: 1, name: "Sara", score: 92 });
  }, 300);
}

function promisify(fn) {
  return (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (error, value) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(value);
      });
    });
}

const getStudentPromised = promisify(getStudentCallback);

// Uncomment:
//
// getStudentPromised(1)
//   .then((student) => console.log(student))
//   .catch((error) => console.log(error.message));

// ============================================================
// 12. PROMISE.ALL
// ============================================================
// Promise.all waits for ALL Promises.
// Results preserve input order.
// It rejects if ANY Promise rejects.

// Uncomment:
//
// Promise.all([getStudent(1), getStudent(2), getStudent(3)])
//   .then((students) => console.log(students))
//   .catch((error) => console.log(error.message));

// ============================================================
// 13. PROMISE.ALLSETTLED
// ============================================================
// Promise.allSettled waits for every Promise.
// It gives a status report for each operation and does not
// reject just because one operation failed.

// Uncomment:
//
// Promise.allSettled([getStudent(1), getStudent(99), getStudent(3)])
//   .then((results) => console.log(results));

// ============================================================
// 14. PROMISE.RACE
// ============================================================
// Promise.race settles when the FIRST Promise settles.
// The first result may be success OR failure.

function fastServer() {
  return delay(100).then(() => "Fast server");
}

function slowServer() {
  return delay(500).then(() => "Slow server");
}

// Uncomment:
//
// Promise.race([slowServer(), fastServer()])
//   .then((winner) => console.log(winner))
//   .catch((error) => console.log(error.message));

// ============================================================
// 15. PROMISE.ANY
// ============================================================
// Promise.any resolves with the FIRST successful Promise.
// Rejections are ignored unless every Promise rejects.

function failedMirror() {
  return Promise.reject(new Error("Mirror failed"));
}

function successfulMirror() {
  return delay(200).then(() => "Data from successful mirror");
}

// Uncomment:
//
// Promise.any([failedMirror(), successfulMirror()])
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

// ============================================================
// 16. EVENT LOOP: MICROTASKS VS TIMERS
// ============================================================
// Promise handlers are microtasks.
// setTimeout callbacks are tasks/macrotasks.
// Microtasks run before timers after synchronous code finishes.
//
// Expected order:
// 1 - sync
// 2 - sync
// 3 - Promise microtask
// 4 - timer

function eventLoopDemo() {
  // console.log("1 - sync");

  setTimeout(() => {
    // console.log("4 - timeout");
  }, 0);

  Promise.resolve().then(() => {
    // console.log("3 - Promise microtask");
  });

  // console.log("2 - sync");
}

// Uncomment:
// eventLoopDemo();

// ============================================================
// 17. FULL PROMISE CHAIN EXAMPLE
// ============================================================

function buildReportWithPromises(id) {
  let student;

  return getStudent(id)
    .then((foundStudent) => {
      student = foundStudent;
      return getScores(student.id);
    })
    .then((scores) => {
      student = { ...student, scores };
      return getCourse(student.courseId);
    })
    .then((course) => {
      return {
        ...student,
        course: course.title,
      };
    });
}

// Uncomment:
//
// buildReportWithPromises(101)
//   .then((report) => {
//     console.log(
//       `${report.name} - ${report.course} - Average: ${average(report.scores).toFixed(1)}`
//     );
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

// ============================================================
// END OF PART 1
// ============================================================
// Main ideas:
// - Promise states: pending, fulfilled, rejected
// - resolve and reject
// - then, catch, finally
// - chaining and returning Promises
// - centralized error handling
// - promisifying callbacks
// - all, allSettled, race, any
// - Promise callbacks use the microtask queue
