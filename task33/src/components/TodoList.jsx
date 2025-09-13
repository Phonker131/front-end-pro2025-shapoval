import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem.jsx";

export default function TodoList() {
    const list = useSelector((s) => s.todos.list);
    if (!list.length) return <div className="small">Looks like it's empty</div>;
    return (
        <div className="vstack">
            {list.map((t) => (
                <TodoItem key={t.id} todo={t} />
            ))}
        </div>
    );
}
