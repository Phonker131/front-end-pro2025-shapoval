import TodoForm from "./todo/todoForm.jsx";
import TodoList from "./todo/todoList.jsx";
import Footer from "./todo/Footer.jsx";

export default function App() {
    return (
        <div className="app">
            <h1>TODO</h1>
            <TodoForm />
            <TodoList />
            <Footer />
        </div>
    );
}
