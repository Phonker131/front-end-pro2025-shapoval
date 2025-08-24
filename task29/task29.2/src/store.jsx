import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo/todoSlice.jsx";

export const store = configureStore({
    reducer: {
        todo: todoReducer,
    },
});
