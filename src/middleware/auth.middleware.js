import { loadFromLocalStorage, loadFromSessionStorage } from '../store/storage.js';

export const authMiddleware = (next) => {
    const user = loadFromLocalStorage('user') || loadFromSessionStorage('user');
    if(user) {
        next(true);
    } else {
        next(false);
    }
}