import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const api = axios.create({ baseURL });

export const fetchTodos = async () => {
    const { data } = await api.get("/todo?_sort=createdAt&_order=desc");
    return data;
};

export const createTodo = async (text) => {
    const now = Date.now();
    const { data } = await api.post("/todo", { text, completed: false, createdAt: now, updatedAt: now });
    return data;
};

export const removeTodo = async (id) => {
    await api.delete(`/todo/${id}`);
    return id;
};

export const patchTodo = async (id, patch) => {
    const { data } = await api.patch(`/todo/${id}`, { ...patch, updatedAt: Date.now() });
    return data;
};
