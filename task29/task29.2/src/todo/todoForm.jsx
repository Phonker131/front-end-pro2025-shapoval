import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./todoSlice.jsx";

export default function TodoForm() {
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addTodo({ text }));
        setText("");
    };

    return (
        <form className="todo-form" onSubmit={onSubmit}>
            <input type="text" placeholder="New task" value={text} onChange={(e) => setText(e.target.value)} aria-label="Add new task" />
            <button type="submit">Add</button>
        </form>
    );
}
