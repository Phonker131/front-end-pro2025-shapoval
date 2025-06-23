const form = document.forms[0];
const input = form.elements.value;
const list = document.querySelector(".js--todos-wrapper");

let tasks = [];

if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    render();
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const value = input.value.trim();
    if (!value) return;

    const task = {
        id: Date.now(),
        text: value,
        done: false,
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
    form.reset();
});

list.addEventListener("click", function (e) {
    const li = e.target.closest("li");
    if (!li) return;

    const id = Number(li.getAttribute("data-id"));

    if (e.target.type === "checkbox") {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === id) {
                tasks[i].done = e.target.checked;
                break;
            }
        }
    }

    if (e.target.tagName === "BUTTON") {
        tasks = tasks.filter(function (t) {
            return t.id !== id;
        });
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
});

window.addEventListener("storage", function () {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    render();
});

function render() {
    list.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);
        if (task.done) {
            li.style.textDecoration = "line-through";
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;

        const span = document.createElement("span");
        span.textContent = task.text;
        span.style.margin = "0 10px";

        const btn = document.createElement("button");
        btn.textContent = "Видалити";

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(btn);
        list.appendChild(li);
    }
}
