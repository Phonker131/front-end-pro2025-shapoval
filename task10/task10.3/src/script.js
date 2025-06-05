window.addEventListener("DOMContentLoaded", () => {
    const imgElement = document.getElementById("random-img");
    const randomIndex = Math.floor(Math.random() * 9) + 1;

    imgElement.src = "./images/" + randomIndex + ".jpg";
    imgElement.alt = "./'images/" + randomIndex + ".jpg";
});
