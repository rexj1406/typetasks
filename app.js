import { addTask, filterByStatus, advanceTask, deleteTask, } from "./model.js";
let tasks = [];
let currentFilter = "all";
// DOM Elements with typed casting
const titleInput = document.getElementById("title");
const addBtn = document.getElementById("add");
const listEl = document.getElementById("list");
const filterBtns = document.querySelectorAll(".filter-btn");
// Handle adding a task
addBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    if (!title)
        return;
    tasks = addTask(tasks, title);
    titleInput.value = "";
    render();
});
// Handle filtering
filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        render();
    });
});
// Render tasks into the UI
function render() {
    listEl.innerHTML = "";
    const displayedTasks = currentFilter === "all"
        ? tasks
        : filterByStatus(tasks, currentFilter);
    displayedTasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = "task-item";
        li.innerHTML = `
      <div class="task-info">
        <span class="badge ${task.status}">${task.status}</span>
        <span class="title">${task.title}</span>
      </div>
      <div class="actions">
        ${task.status !== "done"
            ? `<button class="action-btn advance" data-id="${task.id}">Advance →</button>`
            : ""}
        <button class="action-btn delete" data-id="${task.id}">✕</button>
      </div>
    `;
        // Advance event listener
        const advanceBtn = li.querySelector(".advance");
        if (advanceBtn) {
            advanceBtn.addEventListener("click", () => {
                tasks = advanceTask(tasks, task.id);
                render();
            });
        }
        // Delete event listener
        const deleteBtn = li.querySelector(".delete");
        if (deleteBtn) {
            deleteBtn.addEventListener("click", () => {
                tasks = deleteTask(tasks, task.id);
                render();
            });
        }
        listEl.appendChild(li);
    });
}
