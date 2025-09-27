export function toggleSpinner(isLoading) {
  const taskListSpinner = document.querySelectorAll(
    ".dashboard__task-list-spinner"
  );
  taskListSpinner.forEach((spinner) => {
    spinner.style.display = isLoading ? "block" : "none";
  });
}
