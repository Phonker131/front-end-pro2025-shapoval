import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function RouteError() {
    const error = useRouteError();
    let message = "Unknown error";
    if (isRouteErrorResponse(error)) {
        message = `${error.status} ${error.statusText}`;
    } else if (error instanceof Error) {
        message = error.message;
    }
    return (
        <div className="container">
            <h2>Non existing route</h2>
            <p className="muted">{message}</p>
            <Link className="button" to="/">
                To the main page
            </Link>
        </div>
    );
}
