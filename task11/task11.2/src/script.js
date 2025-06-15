const container = document.getElementById("container");

container.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
        const btnText = event.target.textContent;
        const btnId = event.target.getAttribute("data-id");
        console.log(`button that was clicked ${btnText}, data-id = ${btnId}`);
    }
});
