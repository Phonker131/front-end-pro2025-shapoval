import { useSelector } from "react-redux";
import { selectTodos } from "./todoSlice.jsx";

export default function TodoList() {
    const todos = useSelector(selectTodos);

    return (
        <ul className="todo-list">
            {todos.map((t) => (
                <li key={t.id}>{t.text}</li>
            ))}
            {todos.length === 0 && <li className="empty">Looks like it's empty, for now</li>}
        </ul>
    );
}
