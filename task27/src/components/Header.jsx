import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

const linkStyle = ({ isActive }) => ({
    padding: "8px 10px",
    borderRadius: 8,
    background: isActive ? "rgba(37,99,235,0.12)" : "transparent",
});

export default function Header() {
    return (
        <header style={{ borderBottom: "1px solid #eee" }}>
            <nav style={{ display: "flex", gap: 12, padding: 16, justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 12 }}>
                    <NavLink to="/" style={linkStyle}>
                        Main page
                    </NavLink>
                    <NavLink to="/contacts" style={linkStyle}>
                        Contacts
                    </NavLink>
                    <NavLink to="/about" style={linkStyle}>
                        About me
                    </NavLink>
                </div>
                <ThemeToggle />
            </nav>
        </header>
    );
}
