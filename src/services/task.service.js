import { TASKS } from '../data/tasks.data.js';
import { saveToLocalStorage } from '../store/storage.js';


export const createTask = (task) => {
    const newTask = {
        id: TASKS.length + 1,
        title: task.title,
        description: task.description,
        completed: false
    }
    
    const updatedTasks = [...TASKS, newTask];
    saveToLocalStorage('tasks', updatedTasks);
    return updatedTasks;
}

export const getActiveTasks = () => {
    return TASKS.filter(task => !task.completed);
}

export const getCompletedTasks = () => {
    return TASKS.filter(task => task.completed);
}

// TODO Check if this is needed
export const getAllTasks = () => {
    return {
        activeTasks: getActiveTasks(),
        completedTasks: getCompletedTasks(),
    }
}

export const updateTask = (taskId, updatedTask) => {
    const taskToEdit = getTaskById(taskId);
    if(!taskToEdit) return null;

    const updatedTasks = TASKS.map((task) => 
        task.id === taskToEdit.id 
            ? { ...task, ...updatedTask }
            : task
    );

    saveToLocalStorage('tasks', updatedTasks);
    return updatedTasks;
}

export const deleteTask = (taskId) => {
    const updatedTasks = TASKS.filter(task => task.id !== taskId);
    console.log(updateTask)
    saveToLocalStorage('tasks', updatedTasks);
    return updatedTasks;
}

export const toggleTaskCompletion = (taskId) => {
    const taskToToggle = getTaskById(taskId);
    if(!taskToToggle) return null;

    const updatedTasks = TASKS.map((task) => 
        task.id === taskToToggle.id 
            ? { ...task, completed: !task.completed }
            : task
    );

    saveToLocalStorage('tasks', updatedTasks);
    return updatedTasks;
}

export const getTaskById = (taskId) => {
    return TASKS.find(task => task.id === taskId);
}