import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import { withExtraArgument } from "redux-thunk";
import { swapiReducer } from "./features/swapi.js";
import { api } from "./api/axios";

const loggerMiddleware = (store) => (next) => (action) => {
    if (typeof action === "object") {
        console.log("[logger]", action.type, action);
    }
    return next(action);
};

const rootReducer = combineReducers({
    swapi: swapiReducer,
});

const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const thunkWithApi = withExtraArgument({ api });

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkWithApi, loggerMiddleware)));
