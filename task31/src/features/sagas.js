import { all, call, put, select, takeEvery, takeLatest, retry } from "redux-saga/effects";
import * as API from "./api.js";
import * as T from "./actionTypes.js";
import * as A from "./actions.js";
import { selectTodoById, selectCompletedIds } from "./selectors.js";
import { META, LOCAL_ID } from "./symbols.js";

function* idGenerator() {
    let i = 1;
    while (true) {
        yield i++;
    }
}

const gen = idGenerator();

function* loadTodos() {
    try {
        const list = yield retry(3, 500, API.fetchTodos);
        yield put(A.loadTodosSuccess(list));
    } catch (e) {
        yield put(A.loadTodosFailure(e.message || "Load failed"));
    }
}

function* addTodo(action) {
    const { text } = action.payload;
    const localId = gen.next().value;
    const now = Date.now();
    const optimistic = {
        id: `local-${localId}`,
        text,
        completed: false,
        createdAt: now,
        updatedAt: now,
        [META]: { [LOCAL_ID]: localId, optimistic: true },
    };
    yield put(A.addTodoOptimistic(optimistic));
    try {
        const todo = yield call(API.createTodo, text);
        yield put(A.addTodoCommit(localId, todo));
    } catch (e) {
        yield put(A.addTodoRollback(localId, e.message || "Add failed"));
    }
}

function* deleteTodo(action) {
    const { id } = action.payload;
    try {
        yield call(API.removeTodo, id);
        yield put(A.deleteTodoSuccess(id));
    } catch (e) {
        yield put(A.deleteTodoFailure(e.message || "Delete failed", id));
    }
}

function* toggleTodo(action) {
    const { id } = action.payload;
    try {
        const current = yield select(selectTodoById, id);
        const updated = yield call(API.patchTodo, id, { completed: !current.completed });
        yield put(A.toggleTodoSuccess(updated));
    } catch (e) {
        yield put(A.toggleTodoFailure(e.message || "Toggle failed", id));
    }
}

function* editTodo(action) {
    const { id, text } = action.payload;
    try {
        const updated = yield call(API.patchTodo, id, { text });
        yield put(A.editTodoSuccess(updated));
    } catch (e) {
        yield put(A.editTodoFailure(e.message || "Edit failed", id));
    }
}

function* clearCompleted() {
    try {
        const ids = yield select(selectCompletedIds);
        yield all(ids.map((id) => call(API.removeTodo, id)));
        yield put(A.clearCompletedSuccess(ids));
    } catch (e) {
        yield put(A.clearCompletedFailure(e.message || "Clear failed"));
    }
}

function* watchLoadTodos() {
    yield takeLatest(T.LOAD_TODOS_REQUEST, loadTodos);
}
function* watchAddTodo() {
    yield takeEvery(T.ADD_TODO_REQUEST, addTodo);
}
function* watchDeleteTodo() {
    yield takeEvery(T.DELETE_TODO_REQUEST, deleteTodo);
}
function* watchToggleTodo() {
    yield takeEvery(T.TOGGLE_TODO_REQUEST, toggleTodo);
}
function* watchEditTodo() {
    yield takeEvery(T.EDIT_TODO_REQUEST, editTodo);
}
function* watchClearCompleted() {
    yield takeEvery(T.CLEAR_COMPLETED_REQUEST, clearCompleted);
}

export default function* todosSaga() {
    yield all([watchLoadTodos(), watchAddTodo(), watchDeleteTodo(), watchToggleTodo(), watchEditTodo(), watchClearCompleted()]);
}
