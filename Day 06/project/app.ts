// ============================================
// TASK MANAGER
// ============================================


// --------------------------------------------
// Task Types
// --------------------------------------------

type TaskStatus =
  | "todo"
  | "completed";


interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}


// --------------------------------------------
// Application Data
// --------------------------------------------

let tasks: Task[] = [];


// --------------------------------------------
// DOM Elements
// --------------------------------------------

const form =
  document.querySelector<HTMLFormElement>(
    "#task-form"
  );


const titleInput =
  document.querySelector<HTMLInputElement>(
    "#task-title"
  );


const taskList =
  document.querySelector<HTMLUListElement>(
    "#task-list"
  );


const taskCount =
  document.querySelector<HTMLParagraphElement>(
    "#task-count"
  );


// --------------------------------------------
// Add Task
// --------------------------------------------

function addTask(
  title: string
): Task {

  const task: Task = {
    id: Date.now(),
    title,
    status: "todo"
  };

  tasks.push(task);

  return task;
}


// --------------------------------------------
// Delete Task
// --------------------------------------------

function deleteTask(
  id: number
): void {

  tasks = tasks.filter(
    (task) =>
      task.id !== id
  );

}


// --------------------------------------------
// Toggle Task Status
// --------------------------------------------

function toggleTask(
  id: number
): void {

  const task = tasks.find(
    (task) =>
      task.id === id
  );

  if (!task) {
    return;
  }

  task.status =
    task.status === "todo"
      ? "completed"
      : "todo";
}


// --------------------------------------------
// Get Completed Tasks Count
// --------------------------------------------

function getCompletedCount(): number {

  return tasks.filter(
    (task) =>
      task.status === "completed"
  ).length;

}


// --------------------------------------------
// Save Tasks
// --------------------------------------------

function saveTasks(): void {

  const json =
    JSON.stringify(tasks);

  localStorage.setItem(
    "tasks",
    json
  );

}


// --------------------------------------------
// Load Tasks
// --------------------------------------------

function loadTasks(): void {

  const savedTasks =
    localStorage.getItem(
      "tasks"
    );

  if (!savedTasks) {
    return;
  }

  tasks = JSON.parse(
    savedTasks
  );

}


// --------------------------------------------
// Update Task Counter
// --------------------------------------------

function updateTaskCount(): void {

  if (!taskCount) {
    return;
  }

  const completed =
    getCompletedCount();

  taskCount.textContent =
    `Total: ${tasks.length} | Completed: ${completed}`;

}


// --------------------------------------------
// Render Tasks
// --------------------------------------------

function renderTasks(): void {

  if (!taskList) {
    return;
  }


  taskList.innerHTML = "";


  if (tasks.length === 0) {

    const message =
      document.createElement("li");

    message.textContent =
      "No tasks available";

    taskList.appendChild(
      message
    );

    updateTaskCount();

    return;

  }


  tasks.forEach((task) => {

    const item =
      document.createElement("li");


    const title =
      document.createElement("span");


    const completeButton =
      document.createElement("button");


    const deleteButton =
      document.createElement("button");


    title.textContent =
      task.title;


    completeButton.textContent =
      task.status === "completed"
        ? "Undo"
        : "Complete";


    deleteButton.textContent =
      "Delete";


    if (
      task.status === "completed"
    ) {

      item.classList.add(
        "completed"
      );

    }


    completeButton.addEventListener(
      "click",
      () => {

        toggleTask(task.id);
        saveTasks();
        renderTasks();

      }
    );


    deleteButton.addEventListener(
      "click",
      () => {

        deleteTask(task.id);
        saveTasks();
        renderTasks();

      }
    );


    item.appendChild(
      title
    );


    item.appendChild(
      completeButton
    );


    item.appendChild(
      deleteButton
    );


    taskList.appendChild(
      item
    );

  });


  updateTaskCount();

}


// --------------------------------------------
// Form Submit
// --------------------------------------------

form?.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();


    if (!titleInput) {
      return;
    }


    const title =
      titleInput.value.trim();


    if (!title) {
      return;
    }


    addTask(title);
    saveTasks();
    renderTasks();


    titleInput.value = "";

  }
);


// --------------------------------------------
// Start Application
// --------------------------------------------

loadTasks();

renderTasks();


// Uncomment during explanation:
//
// console.log(tasks);