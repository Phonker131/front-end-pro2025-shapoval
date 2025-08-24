import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo(state, action) {
            const text = String(action.payload?.text ?? "").trim();
            if (!text) return;
            state.items.push({
                id: Date.now(),
                text,
            });
        },
    },
});

export const { addTodo } = todoSlice.actions;

export const selectTodos = (state) => state.todo.items;
export const selectTodoCount = (state) => state.todo.items.length;

export default todoSlice.reducer;
