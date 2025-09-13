import * as T from "./actionTypes.js";

export const loadTodosRequest = () => ({ type: T.LOAD_TODOS_REQUEST });
export const loadTodosSuccess = (list) => ({ type: T.LOAD_TODOS_SUCCESS, payload: list });
export const loadTodosFailure = (message) => ({ type: T.LOAD_TODOS_FAILURE, error: message });

export const addTodoRequest = (text) => ({ type: T.ADD_TODO_REQUEST, payload: { text } });
export const addTodoOptimistic = (todo) => ({ type: T.ADD_TODO_OPTIMISTIC, payload: todo });
export const addTodoCommit = (localId, todo) => ({ type: T.ADD_TODO_COMMIT, payload: { localId, todo } });
export const addTodoRollback = (localId, message) => ({ type: T.ADD_TODO_ROLLBACK, payload: { localId }, error: message });

export const deleteTodoRequest = (id) => ({ type: T.DELETE_TODO_REQUEST, payload: { id } });
export const deleteTodoSuccess = (id) => ({ type: T.DELETE_TODO_SUCCESS, payload: { id } });
export const deleteTodoFailure = (message, id) => ({ type: T.DELETE_TODO_FAILURE, error: message, meta: { id } });

export const toggleTodoRequest = (id) => ({ type: T.TOGGLE_TODO_REQUEST, payload: { id } });
export const toggleTodoSuccess = (todo) => ({ type: T.TOGGLE_TODO_SUCCESS, payload: todo });
export const toggleTodoFailure = (message, id) => ({ type: T.TOGGLE_TODO_FAILURE, error: message, meta: { id } });

export const editTodoRequest = (id, text) => ({ type: T.EDIT_TODO_REQUEST, payload: { id, text } });
export const editTodoSuccess = (todo) => ({ type: T.EDIT_TODO_SUCCESS, payload: todo });
export const editTodoFailure = (message, id) => ({ type: T.EDIT_TODO_FAILURE, error: message, meta: { id } });

export const clearCompletedRequest = () => ({ type: T.CLEAR_COMPLETED_REQUEST });
export const clearCompletedSuccess = (removedIds) => ({ type: T.CLEAR_COMPLETED_SUCCESS, payload: { removedIds } });
export const clearCompletedFailure = (message) => ({ type: T.CLEAR_COMPLETED_FAILURE, error: message });
