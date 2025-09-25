export function loadFromLocalStorage(key) {
    const dataFormLocalStorage = localStorage.getItem(key);
    return dataFormLocalStorage ? JSON.parse(dataFormLocalStorage) : null;
}

export function saveToLocalStorage(key, data) {
    const dataFormLocalStorage = JSON.stringify(data);
    localStorage.setItem(key, dataFormLocalStorage);
}

export function loadFromSessionStorage(key) {
    const dataFormSessionStorage = sessionStorage.getItem(key);
    return dataFormSessionStorage ? JSON.parse(dataFormSessionStorage) : null;
}

export function saveToSessionStorage(key, data) {
    const dataFormSessionStorage = JSON.stringify(data);
    sessionStorage.setItem(key, dataFormSessionStorage);
}

export function clearStorage() {
    localStorage.clear();
    sessionStorage.clear();
}