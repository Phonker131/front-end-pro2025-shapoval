import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSwapi, clearTodo } from "./features/swapi.js";
import "./App.css";

const useBadges = (data, endpoint) => {
    return useMemo(() => {
        let url = data?.url || (endpoint ? `https://swapi.py4e.com/${endpoint.replace(/^\//, "")}` : "");
        try {
            const u = new URL(url);
            const parts = u.pathname.split("/").filter(Boolean);
            return { res: parts[1] || "", id: parts[2] || "" };
        } catch {
            return { res: "", id: "" };
        }
    }, [data, endpoint]);
};

export default function App() {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((s) => s.swapi);
    const [endpoint, setEndpoint] = useState("people/1/");

    const { res, id } = useBadges(data, endpoint);

    const handleFetch = () => dispatch(fetchSwapi(endpoint));

    return (
        <div className="container py-4">
            <h1 className="mb-4">SWAPI</h1>

            <div className="input-group mb-3">
                <span className="input-group-text">https://swapi.dev/api/</span>
                <input type="text" className="form-control" placeholder="people/1/" aria-label="SWAPI endpoint" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleFetch()} />
                <button className="btn btn-outline-secondary" type="button" onClick={handleFetch} disabled={loading}>
                    {loading ? (
                        <span className="d-inline-flex align-items-center gap-2">
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading…
                        </span>
                    ) : (
                        "Get info"
                    )}
                </button>
            </div>

            <div className="card">
                <div className="card-header d-flex align-items-center gap-2">
                    {res && <span className="badge bg-secondary me-2">{res}</span>}
                    {id && <span className="badge bg-light text-dark">{id}</span>}
                    {!res && !id && <span className="text-muted small">No endpoint parsed</span>}
                </div>
                <div className="card-body">
                    {error && (
                        <div className="alert alert-danger mb-3" role="alert">
                            {error}
                        </div>
                    )}
                    <pre className="bg-light p-3 rounded text-break text-dark small" style={{ minHeight: 180 }}>
                        {JSON.stringify(data ?? {}, null, 2)}
                    </pre>
                </div>
            </div>

            <footer className="mt-4 text-center">
                <button className="btn btn-warning" type="button" onClick={() => dispatch(clearTodo())}>
                    Clear TODO
                </button>
            </footer>
        </div>
    );
}
