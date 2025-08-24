import { useSelector } from "react-redux";
import { selectTodoCount } from "./todoSlice.jsx";

export default function Footer() {
    const count = useSelector(selectTodoCount);
    return (
        <footer className="footer">
            Total: <strong>{count}</strong>
        </footer>
    );
}
