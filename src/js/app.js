import { authMiddleware } from '../middleware/auth.middleware.js';

document.addEventListener('DOMContentLoaded', () => {
    authMiddleware((isAuthenticated) => {
        if(!isAuthenticated) {
            window.location.href = '../pages/login.html';
        } else {
            window.location.href = '../pages/dashboard.html';
        }
    });
});