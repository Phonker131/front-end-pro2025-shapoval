export const selectTodos = (s) => s.todos.list;
export const selectTodoById = (s, id) => s.todos.list.find((t) => t.id === id);
export const selectCompletedIds = (s) => s.todos.list.filter((t) => t.completed).map((t) => t.id);
