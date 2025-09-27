import { authMiddleware } from "../middleware/auth.middleware.js";
import { clearStorage } from "../store/storage.js";
import {
  getAllTasks,
  deleteTask,
  toggleTaskCompletion,
  createTask,
  getTotalTasks,
  updateTask,
  getTaskById,
} from "../services/task.service.js";
import {
  activeTaskTemplate,
  completedTaskTemplate,
} from "../templates/task.template.js";
import { toggleSpinner } from "../utils/toggle-spinner.js";

function logout() {
  clearStorage();
  window.location.href = "../pages/login.html";
}

async function renderTasks() {
  const completedTasksList = document.querySelector(
    ".dashboard__task-list-completed"
  );
  const activeTasksList = document.querySelector(
    ".dashboard__task-list-active"
  );

  toggleSpinner(true);

  const { completedTasks, activeTasks } = await getAllTasks();

  toggleSpinner(false);

  completedTasksList.innerHTML = completedTasks
    .map(completedTaskTemplate)
    .join("");
  activeTasksList.innerHTML = activeTasks.map(activeTaskTemplate).join("");

  updateTaskCounters();
  setupEventListeners();
}

function updateTaskCounters() {
  const { completedTasks, activeTasks } = getTotalTasks();

  const completedCountElement = document.getElementById("completed-count");
  const activeCountElement = document.getElementById("active-count");

  if (completedCountElement) {
    completedCountElement.textContent = completedTasks;
  }

  if (activeCountElement) {
    activeCountElement.textContent = activeTasks;
  }
}

function onCreatTask({ title, description }) {
  createTask({ title, description });
  renderTasks();
}
function onUpdateTask(taskId, updatedTask) {
  updateTask(taskId, updatedTask);
  renderTasks();
}

function openEditModal(taskId) {
  const task = getTaskById(taskId);
  if (!task) return;

  const modal = document.getElementById("edit-modal");
  const titleInput = document.getElementById("edit-title");
  const descriptionInput = document.getElementById("edit-description");

  titleInput.value = task.title;
  descriptionInput.value = task.description;

  modal.classList.add("modal--show");
  modal.dataset.taskId = taskId;
}

function closeEditModal() {
  const modal = document.getElementById("edit-modal");
  modal.classList.remove("modal--show");
}

function handleEditFormSubmit(e) {
  e.preventDefault();

  const modal = document.getElementById("edit-modal");
  const taskId = parseInt(modal.dataset.taskId);

  const titleInput = document.getElementById("edit-title");
  const descriptionInput = document.getElementById("edit-description");

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!title || !description) {
    alert("Please complete all fields");
    return;
  }

  onUpdateTask(taskId, { title, description });
  closeEditModal();
}

function onDeleteTask(taskId) {
  deleteTask(taskId);
  renderTasks();
}

function onToggleTask(taskId) {
  toggleTaskCompletion(taskId);
  renderTasks();
}

function setupEventListeners() {
  const deleteTaskBtns = document.querySelectorAll('[data-action="delete"]');
  deleteTaskBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const taskId = parseInt(e.target.closest(".task-card").dataset.taskId);
      onDeleteTask(taskId);
    });
  });

  const completeTaskBtns = document.querySelectorAll(
    '[data-action="complete"]'
  );
  completeTaskBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const taskId = parseInt(e.target.closest(".task-card").dataset.taskId);
      onToggleTask(taskId);
    });
  });

  const editTaskBtns = document.querySelectorAll('[data-action="edit"]');
  editTaskBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const taskId = parseInt(e.target.closest(".task-card").dataset.taskId);
      openEditModal(taskId);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  authMiddleware((isAuthenticated) => {
    if (!isAuthenticated) {
      window.location.href = "../pages/login.html";
    }
  });

  const logoutBtn = document.querySelector("[logout-btn]");
  const submitTaskBtn = document.querySelector(".dashboard__create-task-btn");
  const modal = document.getElementById("edit-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const cancelEditBtn = document.getElementById("cancel-edit");
  const editForm = document.getElementById("edit-form");

  submitTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const titleInput = document.querySelector('input[name="title"]');
    const descriptionInput = document.querySelector(
      'input[name="description"]'
    );

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!title || !description) {
      alert("Please complete all fields");
      return;
    }

    onCreatTask({ title, description });

    titleInput.value = "";
    descriptionInput.value = "";

    renderTasks();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.classList.contains("modal__overlay")) {
      closeEditModal();
    }
  });

  closeModalBtn.addEventListener("click", closeEditModal);
  cancelEditBtn.addEventListener("click", closeEditModal);
  logoutBtn.addEventListener("click", logout);
  editForm.addEventListener("submit", handleEditFormSubmit);
  renderTasks();
});
