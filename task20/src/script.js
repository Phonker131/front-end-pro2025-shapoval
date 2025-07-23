$(function () {
    const $form = $("#todo-form");
    const $input = $("#todo-input");
    const $list = $("#todo-list");

    let tasks = [];

    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        render();
    }

    $form.on("submit", function (e) {
        e.preventDefault();
        const text = $input.val().trim();
        if (!text) return;

        const task = {
            id: Date.now(),
            text: text,
            done: false,
        };

        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        render();
        $form[0].reset();
    });

    $list.on("click", function (e) {
        const $li = $(e.target).closest("li");
        if (!$li.length) return;

        const id = Number($li.data("id"));

        if ($(e.target).is("input[type=checkbox]")) {
            tasks = tasks.map((t) => (t.id === id ? { ...t, done: e.target.checked } : t));
            localStorage.setItem("tasks", JSON.stringify(tasks));
            render();
        }

        if ($(e.target).hasClass("btn-danger")) {
            tasks = tasks.filter((t) => t.id !== id);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            render();
        }
    });

    $list.on("click", ".task-text", function () {
        const id = $(this).data("task-id");
        const task = tasks.find((t) => t.id === id);
        if (task) {
            $("#taskModalBody").text(task.text);
            const modal = new bootstrap.Modal(document.getElementById("taskModal"));
            modal.show();
        }
    });

    window.addEventListener("storage", () => {
        tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        render();
    });

    function render() {
        $list.empty();

        tasks.forEach((task) => {
            const $li = $("<li>").addClass("list-group-item d-flex justify-content-between align-items-center").attr("data-id", task.id);

            const $left = $("<div>").addClass("d-flex align-items-center gap-2");

            const $checkbox = $("<input>").attr("type", "checkbox").prop("checked", task.done);

            const $text = $("<span>").addClass("task-text").css("cursor", "pointer").data("task-id", task.id).text(task.text);

            if (task.done) {
                $text.css("text-decoration", "line-through");
            }

            $left.append($checkbox, $text);

            const $deleteBtn = $("<button>").addClass("btn btn-sm btn-danger").text("Delete");

            $li.append($left, $deleteBtn);
            $list.append($li);
        });
    }
});
