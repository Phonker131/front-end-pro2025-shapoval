const slides = document.querySelectorAll(".slide");
const slidesContainer = document.querySelector(".slides");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");
let slideWidth = 600;
let index = 0;

function showSlide(i) {
    slidesContainer.style.transform = `translateX(-${i * slideWidth}px)`;

    prev.style.display = i === 0 ? "none" : "block";
    next.style.display = i === slides.length - 1 ? "none" : "block";

    dotsContainer.querySelectorAll("button").forEach((dot, idx) => {
        dot.classList.toggle("active", idx === i);
    });
}

slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.addEventListener("click", () => {
        index = i;
        showSlide(index);
    });
    dotsContainer.appendChild(dot);
});

prev.addEventListener("click", () => {
    if (index > 0) {
        index--;
        showSlide(index);
    }
});

next.addEventListener("click", () => {
    if (index < slides.length - 1) {
        index++;
        showSlide(index);
    }
});

showSlide(index);
