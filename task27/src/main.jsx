import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext.jsx";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Contacts from "./pages/Contacts.jsx";
import About from "./pages/About.jsx";
import RouteError from "./pages/404.jsx";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <RouteError />,
        children: [
            { index: true, element: <Home /> },
            { path: "contacts", element: <Contacts /> },
            { path: "about", element: <About /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
);
