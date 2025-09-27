import { authMiddleware } from '../middleware/auth.middleware.js';
import { clearStorage } from '../store/storage.js';
import { getAllTasks, deleteTask, toggleTaskCompletion } from '../services/task.service.js';

function logout() {
    clearStorage();
    window.location.href = '../pages/login.html';
}

function showCompletedTasks() {
    const { completedTasks } = getAllTasks();
    return completedTasks;
} 

function showActiveTasks() {
    const { activeTasks } = getAllTasks();
    return activeTasks;
}

function createTask() {}
function updateTask() {}

function deleteTaskById(taskId) {
    return deleteTask(taskId);
}

document.addEventListener('DOMContentLoaded', () => {
    authMiddleware((isAuthenticated) => {
        if(!isAuthenticated) {
            window.location.href = '../pages/login.html';
        }
    });
    
    const completedTasks = showCompletedTasks();
    const activeTasks = showActiveTasks();

    const logoutBtn = document.querySelector('[logout-btn]');
    const completedTasksList = document.querySelector('.dashboard__task-list-completed');
    const activeTasksList = document.querySelector('.dashboard__task-list-active');
     completedTasksList.innerHTML = completedTasks.map(task => `
        <div class="task-card task-card--completed" data-task-id="${task.id}">
        <div class="task-card__content">
        <h3 class="task-card__title">${task.title}</h3>
        <p class="task-card__description">${task.description}</p>
        <div class="task-card__actions">
        <button class="task-card__btn task-card__btn--delete" data-action="delete" data-task-id="${task.id}">Delete</button>
        </div>
        </div>
        </div>`).join('');
        
        activeTasksList.innerHTML = activeTasks.map(task => `
            <div class="task-card task-card--active" data-task-id="${task.id}">
            <div class="task-card__content">
            <h3 class="task-card__title">${task.title}</h3>
            <p class="task-card__description">${task.description}</p>
            <div class="task-card__actions">
            <button class="task-card__btn task-card__btn--complete" data-action="complete" data-task-id="${task.id}">Complete</button>
            <button class="task-card__btn task-card__btn--edit" data-action="edit" data-task-id="${task.id}">Edit</button>
            <button class="task-card__btn task-card__btn--delete" data-action="delete" data-task-id="${task.id}">Delete</button>
            </div>
            </div>
            </div>`).join('');
            
    const deleteTaskBtn = document.querySelectorAll('[data-action="delete"]');
    const completeTaskBtn = document.querySelectorAll('[data-action="complete"]');
    const editTaskBtn = document.querySelectorAll('[data-action="edit"]');
    deleteTaskBtn.forEach(btn => btn.addEventListener('click', (e) => {
        console.log(e.target.closest('.task-card').dataset.taskId);
        deleteTaskById(e.target.closest('.task-card').dataset.taskId);
    }));

    logoutBtn.addEventListener('click', logout);
});