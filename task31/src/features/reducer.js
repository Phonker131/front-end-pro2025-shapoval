import * as T from "./actionTypes.js";
import { META, LOCAL_ID } from "./symbols.js";

const initial = {
    list: [],
    isLoading: false,
    adding: false,
    pendingIds: [],
    error: null,
};

export default function reducer(state = initial, action) {
    switch (action.type) {
        case T.LOAD_TODOS_REQUEST:
            return { ...state, isLoading: true, error: null };
        case T.LOAD_TODOS_SUCCESS:
            return { ...state, isLoading: false, list: action.payload };
        case T.LOAD_TODOS_FAILURE:
            return { ...state, isLoading: false, error: action.error };

        case T.ADD_TODO_REQUEST:
            return { ...state, adding: true, error: null };
        case T.ADD_TODO_OPTIMISTIC:
            return { ...state, list: [action.payload, ...state.list] };
        case T.ADD_TODO_COMMIT: {
            const { localId, todo } = action.payload;
            return {
                ...state,
                adding: false,
                list: state.list.map((t) => (t[META]?.[LOCAL_ID] === localId ? { ...todo } : t)),
            };
        }
        case T.ADD_TODO_ROLLBACK:
            return {
                ...state,
                adding: false,
                error: action.error,
                list: state.list.filter((t) => t[META]?.[LOCAL_ID] !== action.payload.localId),
            };

        case T.DELETE_TODO_REQUEST:
        case T.TOGGLE_TODO_REQUEST:
        case T.EDIT_TODO_REQUEST:
            return { ...state, pendingIds: [...state.pendingIds, action.payload.id], error: null };

        case T.DELETE_TODO_SUCCESS:
            return {
                ...state,
                pendingIds: state.pendingIds.filter((id) => id !== action.payload.id),
                list: state.list.filter((t) => t.id !== action.payload.id),
            };
        case T.TOGGLE_TODO_SUCCESS:
        case T.EDIT_TODO_SUCCESS:
            return {
                ...state,
                pendingIds: state.pendingIds.filter((id) => id !== action.payload.id),
                list: state.list.map((t) => (t.id === action.payload.id ? { ...t, ...action.payload } : t)),
            };

        case T.DELETE_TODO_FAILURE:
        case T.TOGGLE_TODO_FAILURE:
        case T.EDIT_TODO_FAILURE:
            return { ...state, pendingIds: state.pendingIds.filter((id) => id !== action.meta?.id), error: action.error };

        case T.CLEAR_COMPLETED_SUCCESS:
            return {
                ...state,
                list: state.list.filter((t) => !action.payload.removedIds.includes(t.id)),
            };
        case T.CLEAR_COMPLETED_FAILURE:
            return { ...state, error: action.error };

        default:
            return state;
    }
}
