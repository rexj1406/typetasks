let nextId = 1;
// 3. addTask operation
export function addTask(tasks, title) {
    const newTask = { id: nextId++, title, status: "todo" };
    return [...tasks, newTask];
}
// 4. completeTask operation
export function completeTask(tasks, id) {
    return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}
// 5. filterByStatus operation
export function filterByStatus(tasks, status) {
    return tasks.filter((t) => t.status === status);
}
// -------------------------------------------------------------
// Originality Requirement: Custom Extra Operations
// -------------------------------------------------------------
// Extra Operation 1: Delete a task by ID
export function deleteTask(tasks, id) {
    return tasks.filter((t) => t.id !== id);
}
// Extra Operation 2: Advance task status (todo -> in-progress -> done)
export function advanceTask(tasks, id) {
    return tasks.map((t) => {
        if (t.id !== id)
            return t;
        if (t.status === "todo")
            return { ...t, status: "in-progress" };
        if (t.status === "in-progress")
            return { ...t, status: "done" };
        return t;
    });
}
