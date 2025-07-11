const startBtn = document.getElementById("startBtn");
const timeInput = document.getElementById("timeInput");
const timersContainer = document.getElementById("timersContainer");

function parseTimeInput(input) {
    if (input.includes(":")) {
        const [m, s] = input.split(":").map(Number);
        return m * 60 + s;
    } else {
        return parseInt(input) * 60;
    }
}

function formatTime(seconds) {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
}

startBtn.addEventListener("click", () => {
    const inputValue = timeInput.value.trim();
    if (!inputValue) return;

    const seconds = parseTimeInput(inputValue);
    if (isNaN(seconds) || seconds <= 0) return;

    const timerDiv = document.createElement("div");
    timerDiv.className = "timer";

    const timeSpan = document.createElement("span");
    timeSpan.className = "time";
    timeSpan.textContent = formatTime(seconds);

    const stopBtn = document.createElement("button");
    stopBtn.textContent = "Stop";

    timerDiv.appendChild(timeSpan);
    timerDiv.appendChild(stopBtn);
    timersContainer.appendChild(timerDiv);

    let remaining = seconds;

    const intervalId = setInterval(() => {
        remaining--;
        timeSpan.textContent = formatTime(remaining);

        if (remaining <= 0) {
            clearInterval(intervalId);
            timeSpan.textContent = "00:00";
        }
    }, 1000);

    stopBtn.addEventListener("click", () => {
        clearInterval(intervalId);
    });

    timeInput.value = "";
});
