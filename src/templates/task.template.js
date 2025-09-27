export const completedTaskTemplate = (task) => {
  return `
    <div class="task-card task-card--completed" data-task-id="${task.id}">
        <div class="task-card__content">
        <h3 class="task-card__title">${task.title}</h3>
        <p class="task-card__description">${task.description}</p>
        <div class="task-card__actions">
        <button class="task-card__btn task-card__btn--delete" data-action="delete" data-task-id="${task.id}">Delete</button>
        </div>
        </div>
        </div>
    `;
};

export const activeTaskTemplate = (task) => {
  return `
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
            </div>
    `;
};
