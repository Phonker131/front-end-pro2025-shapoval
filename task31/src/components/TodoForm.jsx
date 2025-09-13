import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoRequest } from "../features/actions.js";

export default function TodoForm() {
    const [text, setText] = React.useState("");
    const dispatch = useDispatch();
    const adding = useSelector((s) => s.todos.adding);

    const submit = (e) => {
        e.preventDefault();
        const value = text.trim();
        if (!value) return;
        dispatch(addTodoRequest(value));
        setText("");
    };

    return (
        <form onSubmit={submit} className="hstack">
            <input type="text" placeholder="New task..." value={text} onChange={(e) => setText(e.target.value)} disabled={adding} />
            <button type="submit" disabled={adding || !text.trim()}>
                Add
            </button>
        </form>
    );
}
