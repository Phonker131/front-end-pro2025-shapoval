import { combineReducers } from "redux";
import todos from "../features/reducer.js";

const rootReducer = combineReducers({
    todos,
});

export default rootReducer;
