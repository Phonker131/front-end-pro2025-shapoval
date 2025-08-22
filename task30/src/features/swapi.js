const FETCH_START = "swapi/FETCH_START";
const FETCH_SUCCESS = "swapi/FETCH_SUCCESS";
const FETCH_FAILURE = "swapi/FETCH_FAILURE";
const CLEAR_TODO = "swapi/CLEAR_TODO";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export function swapiReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_START:
            return { ...state, loading: true, error: null };
        case FETCH_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: null };
        case FETCH_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case CLEAR_TODO:
            return { ...state, data: null, error: null, loading: false };
        default:
            return state;
    }
}

const fetchStart = () => ({ type: FETCH_START });
const fetchSuccess = (payload) => ({ type: FETCH_SUCCESS, payload });
const fetchFailure = (payload) => ({ type: FETCH_FAILURE, payload });
export const clearTodo = () => ({ type: CLEAR_TODO });

export const fetchSwapi =
    (endpoint) =>
    async (dispatch, getState, { api }) => {
        const clean = String(endpoint || "")
            .trim()
            .replace(/^\//, "");
        dispatch(fetchStart());
        try {
            const res = await api.get(clean);
            dispatch(fetchSuccess(res.data));
        } catch (err) {
            dispatch(fetchFailure(err.message || "Unknown error"));
        }
    };
