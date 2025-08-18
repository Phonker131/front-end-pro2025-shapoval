import { useEffect, useMemo, useState } from "react";

export default function Home() {
    const [text, setText] = useState("");
    const [items, setItems] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("todos") || "[]");
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(items));
    }, [items]);

    const addTodo = (e) => {
        e.preventDefault();
        const trimmed = text.trim();
        if (!trimmed) return;
        setItems((prev) => [...prev, { id: crypto.randomUUID(), text: trimmed, done: false }]);
        setText("");
    };

    const toggleDone = (id) => setItems((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    const remove = (id) => setItems((prev) => prev.filter((t) => t.id !== id));

    const stats = useMemo(() => {
        const done = items.filter((i) => i.done).length;
        return { total: items.length, done, left: items.length - done };
    }, [items]);

    return (
        <div className="container">
            <h1>Main page</h1>
            <p className="muted">Simple form</p>

            <div className="todo-card">
                <form onSubmit={addTodo} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="New task" style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid rgba(0,0,0,.15)" }} />
                    <button className="button" type="submit">
                        Add
                    </button>
                </form>

                <div className="muted" style={{ marginBottom: 8 }}>
                    In total: {stats.total} · Done: {stats.done} · Left: {stats.left}
                </div>

                {items.length === 0 && <p className="muted">Looks like it's empty</p>}

                {items.map((item) => (
                    <div className="todo-item" key={item.id}>
                        <input type="checkbox" checked={item.done} onChange={() => toggleDone(item.id)} />
                        <span className={item.done ? "line-through" : ""}>{item.text}</span>
                        <button className="button" onClick={() => remove(item.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
