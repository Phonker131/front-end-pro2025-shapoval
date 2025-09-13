import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoRequest, toggleTodoRequest, editTodoRequest } from "../features/actions.js";
import { META } from "../features/symbols.js";

export default function TodoItem({ todo }) {
    const dispatch = useDispatch();
    const pendingIds = useSelector((s) => s.todos.pendingIds);
    const isPending = pendingIds.includes(todo.id);
    const isOptimistic = Boolean(todo[META]?.optimistic);

    const [editing, setEditing] = React.useState(false);
    const [value, setValue] = React.useState(todo.text);

    const onToggle = () => dispatch(toggleTodoRequest(todo.id));
    const onDelete = () => dispatch(deleteTodoRequest(todo.id));

    const startEdit = () => {
        setEditing(true);
        setValue(todo.text);
    };
    const cancelEdit = () => setEditing(false);
    const saveEdit = () => {
        const text = value.trim();
        if (text && text !== todo.text) {
            dispatch(editTodoRequest(todo.id, text));
        }
        setEditing(false);
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter") saveEdit();
        if (e.key === "Escape") cancelEdit();
    };

    return (
        <div className="card todo">
            <input type="checkbox" checked={todo.completed} onChange={onToggle} disabled={isPending || isOptimistic} />
            <div>
                {editing ? (
                    <input autoFocus value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={onKeyDown} onBlur={saveEdit} />
                ) : (
                    <div className={`todo-title ${todo.completed ? "done" : ""}`}>
                        {todo.text}{" "}
                        {isOptimistic && (
                            <span className="badge" style={{ marginLeft: 8 }}>
                                Optimistic
                            </span>
                        )}
                    </div>
                )}
                <div className="small">
                    id: {todo.id} Added: {new Date(todo.createdAt).toLocaleString()} {todo.updatedAt ? `Edited: ${new Date(todo.updatedAt).toLocaleString()}` : ""}
                </div>
            </div>
            <div className="hstack">
                {!editing && (
                    <button className="btn-secondary" onClick={startEdit} disabled={isPending || isOptimistic}>
                        Change
                    </button>
                )}
                <button className="btn-danger" onClick={onDelete} disabled={isPending || isOptimistic}>
                    Remove
                </button>
            </div>
        </div>
    );
}
