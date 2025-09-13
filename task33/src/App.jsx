import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTodosRequest, clearCompletedRequest } from "./features/actions.js";
import TodoForm from "./components/TodoForm.jsx";
import TodoList from "./components/TodoList.jsx";
import Loader from "./components/Loader.jsx";

export default function App() {
    const dispatch = useDispatch();
    const isLoading = useSelector((s) => s.todos.isLoading);
    const error = useSelector((s) => s.todos.error);
    const list = useSelector((s) => s.todos.list);

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    React.useEffect(() => {
        dispatch(loadTodosRequest());
    }, [dispatch]);

    return (
        <div className="container vstack">
            <div className="hstack" style={{ justifyContent: "space-between" }}>
                <h1 style={{ margin: 0 }}>TODO</h1>
                <span className="badge">{list.length}</span>
            </div>
            <TodoForm />

            <div className="card vstack">
                <div className="hstack" style={{ justifyContent: "space-between" }}>
                    <strong>List</strong>
                    <div className="hstack">
                        <button className="btn-secondary" onClick={() => dispatch(loadTodosRequest())} disabled={isLoading}>
                            Update
                        </button>
                        <button className="btn-secondary" onClick={() => dispatch(clearCompletedRequest())} disabled={isLoading}>
                            Clear done
                        </button>
                    </div>
                </div>
                {isLoading && <Loader text="Loading..." />}
                {error && (
                    <div className="small" style={{ color: "#fca5a5" }}>
                        Error: {error}
                    </div>
                )}
                <TodoList />
            </div>
        </div>
    );
}
