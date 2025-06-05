const textBlock = document.getElementById("text-block");
const btn = document.getElementById("color-btn");

const originalColor = getComputedStyle(textBlock).color;
const newColor = "blue";

let isNewColor = false;

btn.addEventListener("click", () => {
    if (!isNewColor) {
        textBlock.style.color = newColor;
        isNewColor = true;
    } else {
        textBlock.style.color = originalColor;
        isNewColor = false;
    }
});
