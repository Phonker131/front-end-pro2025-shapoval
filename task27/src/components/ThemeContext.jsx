import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const ThemeContext = createContext({ theme: "light", toggle: () => {} });

const readInitial = () => {
    const stored = localStorage.getItem("theme");
    return stored && stored.toLowerCase() === "dark" ? "dark" : "light";
};

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(readInitial);

    useEffect(() => {
        const t = theme.toLowerCase();
        document.documentElement.setAttribute("data-theme", t);
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
    }, [theme]);

    const toggle = useCallback(() => setTheme((t) => (t === "light" ? "dark" : "light")), []);
    const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
