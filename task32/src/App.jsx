import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, GlobalStyles as MUIGlobalStyles } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import styled, { ThemeProvider as SCThemeProvider, createGlobalStyle } from "styled-components";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/Home.jsx";
import TodoPage from "./pages/Todo.jsx";
import SWAPIPage from "./pages/SWAPI.jsx";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#4f46e5" },
        secondary: { main: "#14b8a6" },
        background: { default: "#fafafa", paper: "#ffffff" },
    },
    typography: {
        fontFamily: "Inter, Roboto, Helvetica, Arial, sans-serif",
        h1: { fontWeight: 800, letterSpacing: -0.5 },
        h2: { fontWeight: 700 },
        h5: { fontWeight: 700 },
    },
    shape: { borderRadius: 16 },
});

const SCGlobal = createGlobalStyle`
  body {
    background-image: radial-gradient(circle at 1px 1px, rgba(79,70,229,0.12) 1px, transparent 1px);
    background-size: 22px 22px;
  }
`;

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <SCThemeProvider theme={theme}>
                <CssBaseline />
                <SCGlobal />
                <MUIGlobalStyles styles={{ a: { textDecoration: "none" } }} />
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/todo" element={<TodoPage />} />
                        <Route path="/swapi" element={<SWAPIPage />} />
                        <Route path="*" element={<HomePage />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </SCThemeProvider>
        </ThemeProvider>
    );
}
