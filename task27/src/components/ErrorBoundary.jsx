import { Component } from "react";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught", error, info);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="container">
                    <h2>Something went wrong</h2>
                    <p className="muted">{String(this.state.error)}</p>
                    <button className="button" onClick={() => this.setState({ hasError: false, error: null })}>
                        Try again
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}
