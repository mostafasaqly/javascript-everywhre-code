// ============================================================
// PART 3 — ASYNC JAVASCRIPT, TIMERS & THE EVENT LOOP
// ============================================================


// ------------------------------------------------------------
// 1. Synchronous Execution
// ------------------------------------------------------------

// console.log("1");
// console.log("2");
// console.log("3");


// ------------------------------------------------------------
// 2. Blocking Code
// ------------------------------------------------------------

function blockFor(ms) {
  const start = Date.now();//100000

  while (
    //103000 - 100000 < 3000
    Date.now() - start < ms
  ) {
    // Intentionally block the JavaScript thread.
  }
}

function runBlockingDemo() {
  console.log("Before blocking");

  blockFor(3000);

  console.log("After blocking");
}

// runBlockingDemo();


// ------------------------------------------------------------
// 3. Call Stack
// ------------------------------------------------------------

function thirdFunction() {
  console.log("Third");
}

function secondFunction() {
  thirdFunction();

  console.log("Second");
}

function firstFunction() {
  secondFunction();

  console.log("First");
}

// firstFunction();


// ------------------------------------------------------------
// 4. Stack Overflow
// ------------------------------------------------------------

function recursiveForever() {
  recursiveForever();
}

// WARNING: This intentionally crashes with a stack overflow.
// recursiveForever();


// ------------------------------------------------------------
// 5. setTimeout
// ------------------------------------------------------------

function runTimeoutDemo() {
  console.log("Ordering coffee");

  setTimeout(() => {
    console.log("Coffee is ready");
  }, 2000);

  console.log("Reading a book while waiting");
}

// runTimeoutDemo();


// ------------------------------------------------------------
// 6. Pass a Function, Do Not Call It
// ------------------------------------------------------------

function sayHello() {
  console.log("Hello");
}

// Correct: pass the function reference.

// setTimeout(sayHello, 1000);


// Wrong: sayHello runs immediately and its return value is passed.

// setTimeout(sayHello(), 1000);


// ------------------------------------------------------------
// 7. setInterval and clearInterval
// ------------------------------------------------------------

function runIntervalDemo() {
  let seconds = 5;

  const timerId =
    setInterval(() => {
      console.log(seconds);

      seconds--;

      if (seconds === 0) {
        clearInterval(timerId);

        console.log("Lift off");
      }
    }, 2000);
}

// runIntervalDemo();


// ------------------------------------------------------------
// 8. Cancel a Timeout
// ------------------------------------------------------------

function runCancelTimeoutDemo() {
  const reminderId =
    setTimeout(() => {
      console.log("Do not forget!");
    }, 3000);

  clearTimeout(reminderId);

  console.log("Timeout cancelled");
}

// runCancelTimeoutDemo();


// ------------------------------------------------------------
// 9. setTimeout Delay Is a Minimum
// ------------------------------------------------------------

function runMinimumDelayDemo() {
  const start = Date.now();

  setTimeout(() => {
    console.log(
      `Requested 100ms, actual delay: ${Date.now() - start}ms`
    );
  }, 100);

  blockFor(1000);
}

// runMinimumDelayDemo();


// ------------------------------------------------------------
// 10. Event Loop: setTimeout(..., 0)
// ------------------------------------------------------------

function runEventLoopDemo() {
  console.log("A");

  setTimeout(() => {
    console.log("B");
  }, 0);

  console.log("C");
}

// Expected order: A, C, B.
// runEventLoopDemo();


// ------------------------------------------------------------
// 11. Microtask Queue vs Task Queue
// ------------------------------------------------------------

function runMicrotaskDemo() {
  console.log("1");

  setTimeout(() => {
    console.log("2 - task");
  }, 0);

  queueMicrotask(() => {
    console.log("3 - microtask");
  });

  console.log("4");
}

// Expected order: 1, 4, 3, 2.
// runMicrotaskDemo();


// ------------------------------------------------------------
// 12. Event Loop Prediction Challenge
// ------------------------------------------------------------

function runEventLoopChallenge() {
  console.log("A - script starts");

  setTimeout(() => {
    console.log("B - timeout 0");
  }, 0);

  setTimeout(() => {
    console.log("C - timeout 100");
  }, 100);

  setTimeout(() => {
    console.log("D - timeout 50");
  }, 50);

  queueMicrotask(() => {
    console.log("E - microtask");
  });

  for (let i = 1; i <= 3; i++) {
    setTimeout(() => {
      console.log(
        `F - loop timeout ${i}`
      );
    }, 0);
  }

  console.log("G - script ends");

  const start = Date.now();

  while (
    Date.now() - start < 200
  ) {
    // Block the thread so all timers become ready.
  }

  console.log("H - finished blocking");
}

// Ask students to predict the output before uncommenting.
runEventLoopChallenge();

