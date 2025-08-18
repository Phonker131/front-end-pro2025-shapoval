import { useEffect, useState, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const STORAGE_KEY = "formik_todos";

export default function App() {
    const [todos, setTodos] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        setTodos((prev) => [...prev, { id: crypto.randomUUID(), text: trimmed, done: false }]);
    };
    const toggleDone = (id) => setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    const removeTodo = (id) => setTodos((prev) => prev.filter((t) => t.id !== id));

    const stats = useMemo(() => {
        const done = todos.filter((t) => t.done).length;
        return { total: todos.length, done, left: todos.length - done };
    }, [todos]);

    return (
        <div className="container">
            <h1>TODO (Formik)</h1>
            <div className="card">
                <Formik
                    initialValues={{ text: "" }}
                    validate={(values) => {
                        const errors = {};
                        const val = (values.text || "").trim();
                        if (!val) errors.text = "Mandatory field";
                        else if (val.length < 5) errors.text = "At least 5 characters";
                        return errors;
                    }}
                    onSubmit={(values, actions) => {
                        addTodo(values.text);
                        actions.resetForm();
                    }}
                >
                    {({ isValid, dirty, isSubmitting }) => (
                        <Form>
                            <div className="row">
                                <Field name="text" type="text" placeholder="New task" />
                                <button type="submit" disabled={!isValid || !dirty || isSubmitting}>
                                    Add
                                </button>
                            </div>
                            <ErrorMessage name="text" component="div" className="error" />
                        </Form>
                    )}
                </Formik>

                <div className="list">
                    {todos.length === 0 && <div className="muted">Empty</div>}
                    {todos.map((t) => (
                        <div key={t.id} className="item">
                            <input type="checkbox" checked={t.done} onChange={() => toggleDone(t.id)} />
                            <span className={t.done ? "done" : ""}>{t.text}</span>
                            <button onClick={() => removeTodo(t.id)}>Delete</button>
                        </div>
                    ))}
                </div>

                <div className="muted" style={{ marginTop: 8 }}>
                    In total: {stats.total} · Done: {stats.done} · Left: {stats.left}
                </div>
            </div>
        </div>
    );
}
