import axios from "axios";

export const api = axios.create({
    baseURL: "https://swapi.py4e.com/api/",
    timeout: 10000,
    headers: { Accept: "application/json" },
});

api.interceptors.response.use(
    (res) => res,
    (error) => {
        const message = error.response ? `HTTP ${error.response.status}: ${error.response.statusText}` : error.request ? "Network error: no response" : error.message;
        return Promise.reject(new Error(message));
    }
);
