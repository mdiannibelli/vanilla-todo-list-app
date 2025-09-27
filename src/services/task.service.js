import { TASKS } from "../data/tasks.data.js";
import { saveToLocalStorage, loadFromLocalStorage } from "../store/storage.js";

const getCurrentTasks = () => {
  const tasksFromStorage = loadFromLocalStorage("tasks");
  return tasksFromStorage || TASKS;
};

const initializeTasks = () => {
  if (!loadFromLocalStorage("tasks")) {
    saveToLocalStorage("tasks", TASKS);
  }
};

export const createTask = (task) => {
  const currentTasks = getCurrentTasks();
  const newTask = {
    id:
      currentTasks.length > 0
        ? Math.max(...currentTasks.map((t) => t.id)) + 1
        : 1,
    title: task.title,
    description: task.description,
    completed: false,
  };

  const updatedTasks = [...currentTasks, newTask];
  saveToLocalStorage("tasks", updatedTasks);
  return updatedTasks;
};

export const getActiveTasks = () => {
  const currentTasks = getCurrentTasks();
  return currentTasks.filter((task) => !task.completed);
};

export const getCompletedTasks = () => {
  const currentTasks = getCurrentTasks();
  return currentTasks.filter((task) => task.completed);
};

export const getAllTasks = () => {
  // do not ask, just the teacher said to do it
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        activeTasks: getActiveTasks(),
        completedTasks: getCompletedTasks(),
      });
    }, 1000);
  });
};

export const updateTask = (taskId, updatedTask) => {
  const currentTasks = getCurrentTasks();
  const taskToEdit = getTaskById(taskId);
  if (!taskToEdit) return null;

  const updatedTasks = currentTasks.map((task) =>
    task.id === taskToEdit.id ? { ...task, ...updatedTask } : task
  );

  saveToLocalStorage("tasks", updatedTasks);
  return updatedTasks;
};

export const deleteTask = (taskId) => {
  const currentTasks = getCurrentTasks();
  const updatedTasks = currentTasks.filter((task) => task.id !== taskId);
  saveToLocalStorage("tasks", updatedTasks);
  return updatedTasks;
};

export const toggleTaskCompletion = (taskId) => {
  const currentTasks = getCurrentTasks();
  const taskToToggle = getTaskById(taskId);
  if (!taskToToggle) return null;

  const updatedTasks = currentTasks.map((task) =>
    task.id === taskToToggle.id ? { ...task, completed: !task.completed } : task
  );

  saveToLocalStorage("tasks", updatedTasks);
  return updatedTasks;
};

export const getTaskById = (taskId) => {
  const currentTasks = getCurrentTasks();
  return currentTasks.find((task) => task.id === taskId);
};

export const getTotalTasks = () => {
  const currentTasks = getCurrentTasks();

  const { completedTasks, activeTasks } = currentTasks.reduce(
    (acc, task) => {
      if (task.completed) {
        acc.completedTasks += 1;
      } else {
        acc.activeTasks += 1;
      }
      return acc;
    },
    { completedTasks: 0, activeTasks: 0 }
  );

  return { completedTasks, activeTasks };
};

//! Initialize tasks when the module is loaded
initializeTasks();
