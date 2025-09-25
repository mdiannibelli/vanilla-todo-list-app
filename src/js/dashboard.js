import { authMiddleware } from '../middleware/auth.middleware.js';
import { clearStorage } from '../store/storage.js';
import { getAllTasks } from '../services/task.service.js';

function showCompletedTasks() {
    const { completedTasks } = getAllTasks();
    console.log(completedTasks);
} 

function logout() {
    clearStorage();
    window.location.href = '../pages/login.html';
}

function showActiveTasks() {}
    function createTask() {}
    function updateTask() {}
    function deleteTask() {}

document.addEventListener('DOMContentLoaded', () => {
    authMiddleware((isAuthenticated) => {
        if(!isAuthenticated) {
            window.location.href = '../pages/login.html';
        }
    });
    showCompletedTasks();

    const logoutBtn = document.querySelector('[logout-btn]');

    logoutBtn.addEventListener('click', logout);
});