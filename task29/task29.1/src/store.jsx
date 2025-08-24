import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice.jsx";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});
