const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const toastContainer = document.getElementById("toast-container");
let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = getCookie("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
});

taskForm.addEventListener("submit", addTask);

function addTask(e) {
  e.preventDefault();
  if (taskInput.value.trim()) {
    const newTask = {
      id: Date.now(),
      text: taskInput.value,
      completed: false,
      createdAt: Date.now(),
    };
    tasks.unshift(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = "";
    showToast("Task added successfully!", "bg-success");
  }
}

function toggleTask(id) {
  tasks = tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task));
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  const confirmed = confirm("Are you sure you want to delete this task?");
  if (confirmed) {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    renderTasks();
    showToast("Task deleted successfully!", "bg-danger");
  }
}

function renderTasks() {
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) {
      return b.createdAt - a.createdAt;
    }
    return a.completed ? b.completedAt - a.completedAt : -1;
  });
  taskList.innerHTML = sortedTasks
    .map(
      (task) => `
        <li class="list-group-item task-item">
            <div class="task-content" onclick="toggleTask(${task.id})">
                <input class="form-check-input" type="checkbox" ${
                  task.completed ? "checked" : ""
                } onchange="event.stopPropagation();">
                <span class="task-text ${task.completed ? "completed" : ""}">${task.text}</span>
            </div>
            <button class="icon-button" onclick="deleteTask(${task.id})">
                <svg class="feather feather-trash-2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>
        </li>
    `
    )
    .join("");
}

function saveTasks() {
  setCookie("tasks", JSON.stringify(tasks), 7);
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=/";
}

function getCookie(name) {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
}

function showToast(message, bgClass) {
  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-bg-light border-0 show ${bgClass}`;
  toast.role = "alert";
  toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body fw-bold text-white">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" onclick="closeToast(this)"></button>
        </div>
    `;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    if (toast) {
      toast.remove();
    }
  }, 3000);
}

function closeToast(button) {
  const toast = button.closest(".toast");
  if (toast) {
    toast.remove();
  }
}
