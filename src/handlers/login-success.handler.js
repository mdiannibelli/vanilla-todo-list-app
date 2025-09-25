import { saveToLocalStorage, saveToSessionStorage } from "../store/storage.js";

export function handleLoginSuccess(formValues) {
    const { email, password, remember } = formValues;

    if(remember) {
        console.log('Saving to local storage');
        saveToLocalStorage('user', { email, password });
    } else {
        console.log('Saving to session storage');
        saveToSessionStorage('user', { email, password });
    }

    window.location.href = '../pages/index.html';
}