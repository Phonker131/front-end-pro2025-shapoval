import { useTheme } from "./ThemeContext";

export default function ThemeToggle() {
    const { theme, toggle } = useTheme();
    return (
        <button className="button" onClick={toggle} aria-label="Theme switch">
            {theme === "light" ? "Dark" : "Light"}
        </button>
    );
}
