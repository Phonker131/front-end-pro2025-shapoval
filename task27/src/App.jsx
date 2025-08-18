import Header from "./components/Header.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { Outlet } from "react-router-dom";

export default function App() {
    return (
        <ErrorBoundary>
            <Header />
            <main className="container">
                <Outlet />
            </main>
        </ErrorBoundary>
    );
}
