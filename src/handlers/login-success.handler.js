import { saveToLocalStorage, saveToSessionStorage } from "../store/storage.js";

export function handleLoginSuccess(formValues) {
  const { email, password, remember } = formValues;

  if (remember) {
    saveToLocalStorage("user", { email, password });
  } else {
    saveToSessionStorage("user", { email, password });
  }

  window.location.href = "../pages/dashboard.html";
}
