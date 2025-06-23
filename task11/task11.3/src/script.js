const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");

addTaskBtn.addEventListener("click", function () {
    const text = taskInput.value.trim();
    if (text !== "") {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = text;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        taskInput.value = "";
    }
});

taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
        const li = event.target.closest("li");
        if (li) {
            li.remove();
        }
    }
});
