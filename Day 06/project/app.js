// ============================================
// TASK MANAGER
// ============================================
// --------------------------------------------
// Application Data
// --------------------------------------------
let tasks = [];
// --------------------------------------------
// DOM Elements
// --------------------------------------------
const form = document.querySelector("#task-form");
const titleInput = document.querySelector("#task-title");
const taskList = document.querySelector("#task-list");
const taskCount = document.querySelector("#task-count");
// --------------------------------------------
// Add Task
// --------------------------------------------
function addTask(title) {
    const task = {
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
function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
}
// --------------------------------------------
// Toggle Task Status
// --------------------------------------------
function toggleTask(id) {
    const task = tasks.find((task) => task.id === id);
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
function getCompletedCount() {
    return tasks.filter((task) => task.status === "completed").length;
}
// --------------------------------------------
// Save Tasks
// --------------------------------------------
function saveTasks() {
    const json = JSON.stringify(tasks);
    localStorage.setItem("tasks", json);
}
// --------------------------------------------
// Load Tasks
// --------------------------------------------
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (!savedTasks) {
        return;
    }
    tasks = JSON.parse(savedTasks);
}
// --------------------------------------------
// Update Task Counter
// --------------------------------------------
function updateTaskCount() {
    if (!taskCount) {
        return;
    }
    const completed = getCompletedCount();
    taskCount.textContent =
        `Total: ${tasks.length} | Completed: ${completed}`;
}
// --------------------------------------------
// Render Tasks
// --------------------------------------------
function renderTasks() {
    if (!taskList) {
        return;
    }
    taskList.innerHTML = "";
    if (tasks.length === 0) {
        const message = document.createElement("li");
        message.textContent =
            "No tasks available";
        taskList.appendChild(message);
        updateTaskCount();
        return;
    }
    tasks.forEach((task) => {
        const item = document.createElement("li");
        const title = document.createElement("span");
        const completeButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        title.textContent =
            task.title;
        completeButton.textContent =
            task.status === "completed"
                ? "Undo"
                : "Complete";
        deleteButton.textContent =
            "Delete";
        if (task.status === "completed") {
            item.classList.add("completed");
        }
        completeButton.addEventListener("click", () => {
            toggleTask(task.id);
            saveTasks();
            renderTasks();
        });
        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
            saveTasks();
            renderTasks();
        });
        item.appendChild(title);
        item.appendChild(completeButton);
        item.appendChild(deleteButton);
        taskList.appendChild(item);
    });
    updateTaskCount();
}
// --------------------------------------------
// Form Submit
// --------------------------------------------
form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!titleInput) {
        return;
    }
    const title = titleInput.value.trim();
    if (!title) {
        return;
    }
    addTask(title);
    saveTasks();
    renderTasks();
    titleInput.value = "";
});
// --------------------------------------------
// Start Application
// --------------------------------------------
loadTasks();
renderTasks();
// Uncomment during explanation:
//
// console.log(tasks);
