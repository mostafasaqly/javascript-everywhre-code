// ============================================================
// 1. SHARED HELPERS AND FAKE DATABASE
// ============================================================

const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

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

const getStudent = (id) =>
  lookup(STUDENTS, id, "student", LATENCY[id] ?? 50);

const getScores = (studentId) =>
  lookup(SCORES, studentId, "scores for student", 100);

const getCourse = (courseId) =>
  lookup(COURSES, courseId, "course", 100);

function average(numbers) {
  if (numbers.length === 0) return 0;
  return numbers.reduce((total, number) => total + number, 0) / numbers.length;
}

// ============================================================
// 2. ASYNC FUNCTIONS ALWAYS RETURN PROMISES
// ============================================================
// Even when an async function returns a normal value, JavaScript
// wraps that value inside a fulfilled Promise.

async function getScore() {
  return 92;
}

// Uncomment:
// console.log(getScore());
// getScore().then((score) => console.log(score));

// ============================================================
// 3. A THROWN ERROR BECOMES A REJECTED PROMISE
// ============================================================

async function failingFunction() {
  throw new Error("Something went wrong");
}

// Uncomment:
// failingFunction().catch((error) => console.log(error.message));

// ============================================================
// 4. AWAIT PAUSES THE FUNCTION, NOT THE PROGRAM
// ============================================================

async function pauseDemo() {
  console.log("B - inside function before await");

  await null;

  console.log("D - inside function after await");
}

// Uncomment this complete group:
// console.log("A - before function");
// pauseDemo();
// console.log("C - after function call");

// Expected:
// A
// B
// C
// D

// ============================================================
// 5. BASIC AWAIT
// ============================================================

async function showStudent() {
  const student = await getStudent(1);

  console.log(student);
  console.log(student.name);
}

// Uncomment:
// showStudent();

// ============================================================
// 6. BUILDING A REPORT WITH AWAIT
// ============================================================
// This is easier to read than a long .then() chain.
// Every variable stays available to later lines.

async function buildReport(id) {
  const student = await getStudent(id);
  const scores = await getScores(student.id);
  const course = await getCourse(student.courseId);

  return {
    ...student,
    scores,
    course: course.title,
  };
}

// Uncomment:
//
// buildReport(1).then((report) => {
//   console.log(report);
// });

// ============================================================
// 7. TRY / CATCH / FINALLY
// ============================================================
// A rejected Promise makes await throw.
// try/catch can therefore handle asynchronous failures.

async function errorHandlingDemo() {
  try {
    const student = await getStudent(99);

    console.log(student.name);
  } catch (error) {
    console.log(`Failed: ${error.message}`);
  } finally {
    console.log("Cleanup always runs");
  }
}

// Uncomment:
// errorHandlingDemo();

// ============================================================
// 8. SEQUENTIAL EXECUTION
// ============================================================
// These calls depend on waiting one by one.
// Total time is approximately the sum of all waits.

async function sequentialDemo() {
  const started = Date.now();

  const sara = await getStudent(1);
  const omar = await getStudent(2);
  const lina = await getStudent(3);

  console.log(sara.name, omar.name, lina.name);
  console.log(`Sequential time: ${Date.now() - started}ms`);
}

// Uncomment:
// sequentialDemo();

// ============================================================
// 9. PARALLEL EXECUTION WITH PROMISE.ALL
// ============================================================
// These requests do not depend on each other.
// Start them together and wait for all of them.

async function parallelDemo() {
  const started = Date.now();

  const [sara, omar, lina] = await Promise.all([
    getStudent(1),
    getStudent(2),
    getStudent(3),
  ]);

  console.log(sara.name, omar.name, lina.name);
  console.log(`Parallel time: ${Date.now() - started}ms`);
}

// Uncomment:
// parallelDemo();

// ============================================================
// 10. COMPARE SEQUENTIAL VS PARALLEL
// ============================================================

async function comparePerformance() {
  let started = Date.now();

  for (const id of [1, 2, 3]) {
    await getStudent(id);
  }

  const sequentialTime = Date.now() - started;

  started = Date.now();

  await Promise.all([1, 2, 3].map((id) => getStudent(id)));

  const parallelTime = Date.now() - started;

  console.log(`Sequential: ${sequentialTime}ms`);
  console.log(`Parallel:   ${parallelTime}ms`);
}

// Uncomment:
// comparePerformance();

// ============================================================
// 11. FOR...OF WITH AWAIT
// ============================================================
// Use for...of when operations must happen one after another.

async function forOfDemo() {
  for (const id of [1, 2, 3]) {
    const student = await getStudent(id);

    console.log(student.name);
  }

  console.log("All students finished");
}

// Uncomment:
// forOfDemo();

// ============================================================
// 12. WHY forEach(async ...) DOES NOT WAIT
// ============================================================
// forEach ignores the Promise returned by its callback.
// The outer function continues immediately.

async function badForEachDemo() {
  [1, 2, 3].forEach(async (id) => {
    const student = await getStudent(id);

    console.log(student.name);
  });

  console.log("This prints before the students finish");
}

// Uncomment:
// badForEachDemo();

// ============================================================
// 13. CORRECT PARALLEL LIST PROCESSING
// ============================================================

async function mapWithPromiseAllDemo() {
  const students = await Promise.all(
    [1, 2, 3].map(async (id) => {
      const student = await getStudent(id);
      return student;
    })
  );

  console.log(students);
}

// Uncomment:
// mapWithPromiseAllDemo();

// ============================================================
// 14. PROMISE.ALLSETTLED WITH AWAIT
// ============================================================

async function allSettledDemo() {
  const results = await Promise.allSettled([
    getStudent(1),
    getStudent(42),
    getStudent(3),
  ]);

  for (const result of results) {
    if (result.status === "fulfilled") {
      console.log(`Success: ${result.value.name}`);
    } else {
      console.log(`Failed: ${result.reason.message}`);
    }
  }
}

// Uncomment:
// allSettledDemo();

// ============================================================
// 15. TIMEOUT WITH PROMISE.RACE
// ============================================================
// This stops WAITING after the timeout.
// It does not cancel the original operation.

function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Timed out after ${ms}ms`));
    }, ms);
  });

  return Promise.race([promise, timeout]);
}

async function timeoutDemo() {
  try {
    await withTimeout(delay(1000), 300);

    console.log("Completed before timeout");
  } catch (error) {
    console.log(error.message);
  }
}

// Uncomment:
// timeoutDemo();

// ============================================================
// 16. RETRY LOGIC
// ============================================================

let calls = 0;

async function flakyFetch() {
  calls++;

  await delay(100);

  if (calls < 3) {
    throw new Error(`Server error on call ${calls}`);
  }

  return {
    name: "Sara",
    score: 92,
  };
}

async function retry(fn, times) {
  for (let attempt = 1; attempt <= times; attempt++) {
    try {
      // "return await" is intentional here so this try/catch
      // can catch a rejection from fn().
      return await fn();
    } catch (error) {
      // console.log(`Attempt ${attempt} failed: ${error.message}`);

      if (attempt === times) {
        throw error;
      }

      await delay(attempt * 100);
    }
  }
}

async function retryDemo() {
  try {
    const student = await retry(flakyFetch, 5);

    console.log(`Success: ${student.name}`);
    console.log(`Total calls: ${calls}`);
  } catch (error) {
    console.log(`Final failure: ${error.message}`);
  }
}

// Uncomment:
// retryDemo();

// ============================================================
// 17. FULL REPORT EXAMPLE
// ============================================================

async function fullReportDemo() {
  try {
    const reports = await Promise.all([1, 2, 3].map(buildReport));

    for (const report of reports) {
      const avg = average(report.scores);

      console.log(
        `${report.name} - ${report.course} - Average: ${avg.toFixed(1)}`
      );
    }
  } catch (error) {
    console.log(error.message);
  }
}

// Uncomment:
// fullReportDemo();

// ============================================================
// 18. PROGRAM ENTRY POINT
// ============================================================
// In a CommonJS/plain Node script, a common pattern is:
// main().catch(...)
//
// We leave it commented so nothing runs automatically.

async function main() {
  // await showStudent();
  // await comparePerformance();
  // await allSettledDemo();
  // await timeoutDemo();
  // await retryDemo();
  // await fullReportDemo();
}

// Uncomment when you want to run selected calls inside main():
//
// main().catch((error) => {
//   console.log(`Fatal: ${error.message}`);
// });

// ============================================================
// END OF PART 2
// ============================================================
// Main ideas:
// - async always returns a Promise
// - await gives you the fulfilled value
// - await pauses only the current async function
// - rejected Promise + await = thrown error
// - try/catch/finally works naturally
// - independent operations should run in parallel
// - avoid forEach(async ...)
// - timeouts can use Promise.race
// - retries can use loops + try/catch
