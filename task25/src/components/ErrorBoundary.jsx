import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Error has occurred in component:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h2>Error has occurred, try restarting the page</h2>;
        }
        return this.props.children;
    }
}
